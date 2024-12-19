import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');

export let options = {
    thresholds: {
        'http_req_duration': ['p(95)<1000'], // 95% of requests must complete below 500ms
        'errors': ['rate<0.01'], // Less than 1% errors
    },
    stages: [
        { duration: '1m', target: 10 }, // Ramp-up to 10 users over 1 minute
        { duration: '3m', target: 10 }, // Stay at 10 users for 3 minutes
        { duration: '1m', target: 0 }, // Ramp-down to 0 users over 1 minute
    ],
};

export default function () {
    let res = http.post('http://playground1.azurewebsites.net/calculate', JSON.stringify({
        operation: 'add',
        number1: 10,
        number2: 20
    }), { headers: { 'Content-Type': 'application/json' } });

    check(res, {
        'is status 200': (r) => r.status === 200,
        'is result correct': (r) => r.json().result === 30.0,
    }) || errorRate.add(1);

    sleep(1);
}

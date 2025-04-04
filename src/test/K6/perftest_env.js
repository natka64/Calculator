import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '20s', target: 50 },   // Phase 1: Ramp-up to 100 VUs over 20 seconds
    { duration: '20s', target: 100 },   // Phase 2: Ramp-up to 500 VUs over 20 seconds
    { duration: '15s', target: 100 },  // Phase 3: Ramp-up to 1800 VUs over 15 seconds
    { duration: '15s', target: 100 },   // Phase 4: Ramp-down to 500 VUs over 15 seconds
    // Phase 5: Ramp-down to 0 VUs over 10 seconds
    ],
    thresholds: {
    http_req_duration: [`avg<=${__ENV.AVG_THRESHOLD}`, `p(90)<=${__ENV.P90_THRESHOLD}`],  // Thresholds for response times
    },
};

export default function () {
  let payload = JSON.stringify({
    operation: 'divide',
    number1: 5,
    number2: 9,
  });

  let headers = {
    'Content-Type': 'application/json',
  };

  let response = http.post(__ENV.TEST_URL, payload, { headers: headers });

  check(response, {
    'is status 200': (r) => r.status === 200,  // Check for HTTP 200 response
  });
  
}

# run-k6-cloud-test.ps1
$env:K6_CLOUD_TOKEN='118eb49dc4f998192bb99b1e5837890ad59fd23f71535e5f47caa6df18acbc5b'
k6 cloud browser_test.js
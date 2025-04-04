#Read values from JSON file
$Config = Get-Content -Path "config.json" | ConvertFrom-Json
$Env:TEST_URL = $Config.TEST_URL
$Env:AVG_THRESHOLD = $Config.AVG_THRESHOLD
$ENV:P90_THRESHOLD = $Config.P90_THRESHOLD

#run k6 test script
k6 run --out json=output.json perftest_env.js
#k6 cloud .\test.js

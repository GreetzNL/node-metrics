[![Build Status](https://github.com/GreetzNL/node-metrics/workflows/Build%20&%20Publish/badge.svg)](https://github.com/GreetzNL/node-metrics/workflows/Build%20&%20Publish)
# node-metrics
Application for gathering metrics from Node.js applications and exposing them on `/internal/metrics` endpoint in “prometheus” format with simple HTTP authentication.

It uses default metricizes of [**prom-client**](https://www.npmjs.com/package/prom-client) library
<br>
<br>

### Install
```
npm i @greetznl/node-metrics -P
```
<br>

### Usage
```javascript
// import module
const nodeMetrics = require('@greetznl/node-metrics');

// provide the http server on which will be risen the "/internal/metrics" endpoint
nodeMetrics(server)
```
<br>

 ***INTERNAL_USER*** and ***INTERNAL_PASSWORD*** environment variables are required to be set for authentication.
They are used for verifying username and password which should provided with request to `/internal/metrics`.

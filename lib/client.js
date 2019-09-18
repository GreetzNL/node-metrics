const prometheus = require('prom-client');

const getCredentials = (req) => {
  const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
  return Buffer.from(b64auth, 'base64').toString().split(':');
};

const isValidCredentials = (username, password) => (
  username === process.env.INTERNAL_USER
  && password === process.env.INTERNAL_PASSWORD
);

const handler = (req, res) => {
  if (!req.url.startsWith('/internal/metrics')) {
    return null;
  }

  const [username, password] = getCredentials(req);

  if (!isValidCredentials(username, password)) {
    res.setHeader('WWW-Authenticate', 'Basic realm="401"');
    res.statusCode = 401;
    res.statusMessage = 'Authentication required.';
    res.end();
    return null;
  }

  return res.end(prometheus.register.metrics());
};

const client = (server) => {
  prometheus.collectDefaultMetrics({ timeout: 5000 });
  server.on('request', handler);
};

module.exports = client;

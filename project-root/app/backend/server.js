const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type','application/json');
  res.end(JSON.stringify({ msg: 'Hello from sample-backend!', path: req.url }));
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});

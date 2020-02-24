const handler = require('serve-handler');
const path = require('path');
const http = require('http');

const PORT = 1234;

const server = http.createServer((request, response) =>
  handler(request, response, {
    public: path.resolve(__dirname, 'fixtures'),
  }),
);

server.listen(PORT);

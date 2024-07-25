// @ts-check
import http from 'node:http';
import * as Sentry from '@sentry/node';

// Create an HTTP server
const server = http.createServer((req, res) => {
  Sentry.withScope((scope) => {
    scope.addEventProcessor((event) => {
      console.log('processing event');
      return event;
    });

    // @ts-expect-error -- This is a private property.
    console.log(scope._eventProcessors);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, world!\n');
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

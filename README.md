# sentry-memory-leak-repro

A reproduction for the Sentry bug described here: https://github.com/getsentry/sentry-javascript/issues/13055

## Steps to Reproduce

1. Clone the reproduction repository
2. Run npm install
3. Run npm run start
4. Run curl http://localhost:3000/ a few times

## Expected Result

I would expect the log from each request to show just a single event processor. This would indicate that event processors aren't leaking between requests and thus that request isolation is working correctly.

## Actual Result

Every time a request comes in, another event processor is added to the existing scope, indicating that the same scope is being shared among all events. In practice, this will lead to a memory leak, since the array of event processors will grow without bounds.

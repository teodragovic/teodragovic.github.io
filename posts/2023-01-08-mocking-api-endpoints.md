---
title: Mocking API endpoints
date: 2023-01-08
tags:
  - dev
  - js
---

Say you’re working on an app that uses REST API but the endpoints you need don’t exist just yet. To avoid waiting for the backend team to finish work and provide working API, you can temporarily mock endpoints.

For this, I use a library called [`fetch-mock`](https://www.wheresrhys.co.uk/fetch-mock/). It’s built primarily for testing but I find it a good fit for this phase of development.

Here’s what first part of my `serverMock.js` file looks like:

```js
import fetchMock from 'fetch-mock';

fetchMock.config.overwriteRoutes = true;
fetchMock.config.fallbackToNetwork = true;

// Helper fn to return random integer inside range.
const getRandomInt = (min = 0, max = 1) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Wrapper fn that creates mock endpoint
// @param {String} API path
// @param {Function} fn that takes req. body (if present) and returns desired response.
// @return {Promise} Promise that resolves between 500 and 1500ms.
const addMockEndpoint = (path, response = () => ({})) => {
    const fakeLatency = getRandomInt(500, 1500);
    fetchMock.mock(`begin:${ path }`, (url, options) => {
        const body = options.body ? JSON.parse(options.body) : null;
        const resp = response(body, options);
        return new Promise((resolve) => setTimeout(() => resolve(resp), fakeLatency));
    });
};
```

First, I import and [configure](https://www.wheresrhys.co.uk/fetch-mock/#usageconfiguration) `fetch-mock`. `overwriteRoutes` makes sure that, in case both real API endpoint and mock exist, it will use mock. Sometimes API will exist but still be in development and return wrong or empty responses so I prefer removing mocks when API is stable. `fallbackToNetwork` allows for endpoints not mocked to go through the network. Once imported, `fetch-mock` takes over native fetch so even if API exists, if not mocked, it would return 404.

Next is a small utility function that returns a random number inside the given range. Inside my main `addMockEndpoint` function, I use `getRandomInt` to fake latency and get a more real-world feeling for the API behavior. While `fetch-mock` has many methods, I only use `fetch.mock()`. I pass API path (or full URL if it’s on a different domain from the client) to the [matcher](https://www.wheresrhys.co.uk/fetch-mock/#api-mockingmock_matcher) and use `begin:` prefix. This makes sure all GET requests that pass different query values work or dynamic paths (ie. `/user/:id`) are handled. For non-dynamic, POST requests it will work the same as matching the exact URL.

If my request has any data I parse it from the body and pass it to the callback function along with other request information (like method etc.). Mock will either return a 200 OK response or some hardcoded dummy data I define in my `response` callback. The latency value I generated at the beginning will be used to resolve requests after a random period (in this case, between 500 and 1500 milliseconds).

Now that I have my little mocking framework, I can add my endpoints:

```js
// Endpoints without callback argument will respond with 200 OK
addMockEndpoint('/verify-email');

// GET user/:id will return user data
addMockEndpoint('/user/:id', () => {
    return {
        accountId: 1,
        firstName: 'John',
        lastName: 'Doe',
    };
});

// Returning different data based on the verb
addMockEndpoint('/application', (body, { method }) => {
    // create new application
    if (method === 'POST') {
        return ({ id: 1, step: 1 });
    }
    // applicant #12 is at step 3 and all others are at step 2
    if (method === 'GET') {
        return ({ step: body.id === 12 ? 3 : 2 });
    }
});
```

All this is defined in my `serverMock.js` file which is imported into the app entry file (usually `src/index.js` for React apps). Once we have fully-working API in place I can remove the import.

express-throwable
=================

This project contains some lightweight middlewares which helps
to use async handlers and handle errors if it was happened during
request processing.

Requirements
------------

There are no any dependencies for this package. This package compatible
with Express.js v4 or v5 and required Node.js v14+. Implemented on ES7.

Usage
-----

```js
import { throwable, finalize, errorHandler } from 'express-throwable'
// omit other imports...

const app = express() // create express application
// omit app settings...

// add error handler
app.use(errorHandler((error, request, response) => { // this is optional
    // do something with error, for example add record to log
    const details = {
        error,
        url: request.originalUrl,
        params: request.params,
        query: request.query,
        headers: request.headers,
        body: request.body
    }
    logger.error('Error handled.', details)
    // by default response will get status code 500 automatically
    // but you can change this behavior
    response.status(503).end()
}))

// add another error handler
app.use(errorHandler((error, request, response) => {
    // it could be something like this:
    if (error instanceof MyCustomError) {
        // omit logic...
    }
}))

app.get('/feature/:id', throwable(async (request, response) => {
    // now your may don't care about exceptions
    response.status(200).json(await getFeature(request.params.id))
    // when exception is happened then it will be passed into error handlers
}))

// Keep in mind, each throwable handler is a final handler
// No more other middlewares can't handle request after throwable handler,
// except handler which can be passed into `finalize()`

// add last middleware to handle end of request
// it must be really last middleware, don't forget it
app.use(finalize((request, response) => {
    // do something when response is finished...
    // for example, release connections with database, etc
    // something like this:
    const { db } = request.locals
    db.release()
}))

// run server
app.listen(serverPort)
```

Middlewares
-----------

This package provides only three middlewares:

### `throwable(async (request, response) => { ... })`
Use this to wrap you async handlers.

### `finalize((request, response) => { ... })`
Use this for your finally code to release resources, and to execute an error handlers.
It must be last middleware attached to your express application.

### `errorHandler((error, request, response) => { ... })`
Use this to process an errors. Error handlers will called after callback,
which you can pass into `finalize()`.

License
-------

MIT

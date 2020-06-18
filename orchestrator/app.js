const express = require('express');
const app = express();
const port = process.env.PORT || 3002
const routes = require('./routes/routes')

app.use('/', routes)

app.listen( port, () => {
    console.log(`starting server on port ${port}`);
})
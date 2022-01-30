const express = require('express');

const app = express();
const recordRouter = require('./routes/records');
const PORT = 5000;

app.listen(PORT, ()=> {
    console.log(`Records manager server listening on port: ${PORT}`);
});

app.use('/api', recordRouter);


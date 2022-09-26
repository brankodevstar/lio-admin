const express = require('express');
const app = express();

const routes = require('./server/routes');

const PORT = process.env.PORT || 5000;

require('./server/models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
    res.send('Hello from MERN');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
})
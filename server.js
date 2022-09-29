const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const routes = require('./server/routes');

const PORT = process.env.PORT || 5000;

require('./server/models');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.use(routes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
})
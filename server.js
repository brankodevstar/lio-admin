const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();

console.log('env variable =========> ', process.env.MONGO_URL);
console.log('env variable =========> ', process.env.UPLOAD_PATH);
const routes = require('./server/routes');

const PORT = process.env.PORT || 5000;

require('./server/models');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(fileUpload());

app.use(routes);

app.get('/', (req, res) => {
    res.send('Hello from MERN');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
})
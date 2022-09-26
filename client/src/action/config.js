import axios from 'axios';

const LIOAPIServer = axios.create({
    // baseURL: process.env.REACT_APP_LIO_API_URL,
    baseURL: "http://localhost:5000/api/",
    "Content-Type": "application/json"
});

export default LIOAPIServer;
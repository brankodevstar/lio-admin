import axios from 'axios';

const LIOAPIServer = axios.create({
    baseURL: process.env.REACT_APP_LIO_API_URL,
    "Content-Type": "application/json"
});

export default LIOAPIServer;
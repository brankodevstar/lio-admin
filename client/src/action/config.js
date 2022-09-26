import axios from 'axios';
console.log('env value ========> ', process.env.REACT_APP_LIO_API_URL);

const LIOAPIServer = axios.create({
    baseURL: process.env.REACT_APP_LIO_API_URL,
    "Content-Type": "application/json"
});

console.log('LIOAPIServer ===============> ', LIOAPIServer);
export default LIOAPIServer;
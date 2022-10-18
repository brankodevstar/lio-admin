import axios from "axios";

const LIOAPIServer = axios.create({
    baseURL: process.env.REACT_APP_LIO_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default LIOAPIServer;

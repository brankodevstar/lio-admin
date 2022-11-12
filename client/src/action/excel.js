import LIOAPIServer from "./config";

const upload = async (param) => {
    const response = await LIOAPIServer.post("excel", param);
    return response;
};

export default {
    upload,
};
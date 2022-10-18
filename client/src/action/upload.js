import LIOAPIServer from "./config";

const upload = async (param) => {
    const response = await LIOAPIServer.post("upload", param);
    return response;
};

export default {
    upload,
};

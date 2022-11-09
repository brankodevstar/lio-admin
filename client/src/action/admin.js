import LIOAPIServer from "./config";

const login = async (param) => {
    const response = await LIOAPIServer.post("admin/login", param);
    return response;
}

const changePassword = async (param) => {
    const response = await LIOAPIServer.post("admin/changePassword", param);
    return response;
}

export default {
    login,
    changePassword,
};
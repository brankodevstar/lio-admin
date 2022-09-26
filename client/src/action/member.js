import LIOAPIServer from "./config"

const list = async (param) => {
    const response = await LIOAPIServer.get('users', param);
    return response;
}

export default {
    list,
}

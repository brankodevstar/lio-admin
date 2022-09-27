import LIOAPIServer from "./config"

const getList = async (param) => {
    const response = await LIOAPIServer.get('announcements', param);
    return response;
}

export default {
    getList,
}
import LIOAPIServer from "./config";

const getList = async (param) => {
    const response = await LIOAPIServer.get("announcements", param);
    return response;
};

const create = async (param) => {
    const response = await LIOAPIServer.post("announcements", param);
    return response;
};

const update = async (id, param) => {
    const response = await LIOAPIServer.put("announcements/" + id, param);
    return response;
};

const remove = async (id) => {
    const response = await LIOAPIServer.delete("announcements/" + id);
    return response;
};

export default {
    getList,
    create,
    update,
    remove,
};

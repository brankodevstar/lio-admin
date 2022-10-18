import LIOAPIServer from "./config";

const getList = async (param) => {
    const response = await LIOAPIServer.get("events", param);
    return response;
};

const create = async (param) => {
    const response = await LIOAPIServer.post("events", param);
    return response;
};

const update = async (id, param) => {
    const response = await LIOAPIServer.put("events/" + id, param);
    return response;
};

const remove = async (id) => {
    const response = await LIOAPIServer.delete("events/" + id);
    return response;
};

export default {
    getList,
    create,
    update,
    remove,
};

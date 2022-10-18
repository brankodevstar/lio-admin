import LIOAPIServer from "./config";

const list = async (param) => {
    const response = await LIOAPIServer.get("users", param);
    return response;
};

const create = async (param) => {
    const response = await LIOAPIServer.post("users", param);
    return response;
};

const update = async (id, param) => {
    const response = await LIOAPIServer.put("users/" + id, param);
    return response;
};

const remove = async (id) => {
    const response = await LIOAPIServer.delete("users/" + id);
    return response;
};

export default {
    list,
    create,
    update,
    remove,
};

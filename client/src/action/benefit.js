import LIOAPIServer from "./config";

const getList = async (param) => {
    const response = await LIOAPIServer.get("benefits", param);
    return response;
};

const create = async (param) => {
    const response = await LIOAPIServer.post("benefits", param);
    return response;
};

const update = async (id, param) => {
    const response = await LIOAPIServer.put("benefits/" + id, param);
    return response;
};

const remove = async (id) => {
    const response = await LIOAPIServer.delete("benefits/" + id);
    return response;
};

export default {
    getList,
    create,
    update,
    remove,
};

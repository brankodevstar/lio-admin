import LIOAPIServer from "./config";

const getList = async (param) => {
    const response = await LIOAPIServer.get("gallerys", param);
    return response;
};

const create = async (param) => {
    const response = await LIOAPIServer.post("gallerys", param);
    return response;
};

const update = async (id, param) => {
    const response = await LIOAPIServer.put("gallerys/" + id, param);
    return response;
};

const remove = async (id) => {
    const response = await LIOAPIServer.delete("gallerys/" + id);
    return response;
};

export default {
    getList,
    create,
    update,
    remove,
};

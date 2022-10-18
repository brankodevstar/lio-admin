import LIOAPIServer from "./config";

const list = async (param) => {
    const response = await LIOAPIServer.get("investments", {
        data: { type: 1 },
    });
    return response;
};

const create = async (param) => {
    const response = await LIOAPIServer.post("investments", param);
    return response;
};

const update = async (id, param) => {
    const response = await LIOAPIServer.put("investments/" + id, param);
    return response;
};

const remove = async (id) => {
    const response = await LIOAPIServer.delete("investments/" + id);
    return response;
};

export default {
    list,
    create,
    update,
    remove,
};

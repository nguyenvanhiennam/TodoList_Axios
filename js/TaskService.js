import {URL_API} from "./config/constant.js";

const callApi = (uri, method, data) => {
    return axios ({
        url:`${URL_API}/${uri}`,
        method,
        data,
    });
};

export {callApi};
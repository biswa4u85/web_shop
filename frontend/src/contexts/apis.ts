import axios from "axios";
import { toast } from 'react-toastify';

export const axiosInstance: any = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/`,
    headers: {
        "Accept": "application/json"
    },
});

const showError = (error: any) => {
    console.log('error ', error)
    if (error?.response?.data?.errMsg) {
        return toast.error(error?.response?.data?.errMsg);
    }
};

const apis = {
    login: async (body: any) => {
        return axiosInstance
            .post("login", body, { withCredentials: false })
            .then((response: any) => {
                if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                    axiosInstance.defaults.headers['Authorization'] = response?.data?.token
                    return response?.data
                } else {
                    throw new Error(response)
                }
            })
            .catch((error: any) => {
                showError(error);
                return { error: true, message: error?.message }
            });
    },
    logout: async () => {
        return axiosInstance.defaults.headers['Authorization'] = null
    },
    getDataApi: async (url: any, query: any) => {
        let URL = url + "?"
        for (let key in query) {
            URL += `${key}=${query[key]}&`
        }
        return axiosInstance
            .get(URL, query, { withCredentials: false })
            .then((response: any) => {
                if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                    return response?.data
                } else {
                    throw new Error(response)
                }
            })
            .catch((error: any) => {
                showError(error);
                return { error: true, message: error?.message }
            });
    },
    getSingleDataApi: async (url: any, query: any) => {
        let URL = url + "?"
        for (let key in query) {
            URL += `${key}=${query[key]}&`
        }
        return axiosInstance
            .get(URL, query, { withCredentials: false })
            .then((response: any) => {
                if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                    return response?.data
                } else {
                    throw new Error(response)
                }
            })
            .catch((error: any) => {
                showError(error);
                return { error: true, message: error?.message }
            });
    },
    addDataApi: async (url: any, body: any) => {
        return axiosInstance
            .post(url, body, { withCredentials: false })
            .then((response: any) => {
                if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                    return response.data
                } else {
                    throw new Error(response)
                }
            })
            .catch((error: any) => {
                showError(error);
                return { error: true, message: error?.message }
            });
    },
    editDataApi: async (url: any, body: any) => {
        return axiosInstance
            .patch(`${url}/${body._id}`, body, { withCredentials: false })
            .then((response: any) => {
                if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                    return response.data
                } else {
                    throw new Error(response)
                }
            })
            .catch((error: any) => {
                showError(error);
                return { error: true, message: error?.message }
            });
    },
    deleteDataApi: async (url: any, body: any) => {
        return axiosInstance
            .delete(`${url}/${body._id}`, { withCredentials: false })
            .then((response: any) => {
                if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                    return response.data
                } else {
                    throw new Error(response)
                }
            })
            .catch((error: any) => {
                showError(error);
                return { error: true, message: error?.message }
            });
    },
    fileUploadApi: async (url: any, file: any) => {
        let body = new FormData();
        body.append("file", file, file.name);
        return axiosInstance
            .post(url, body, { withCredentials: false })
            .then((response: any) => {
                if (response?.status == 200 || response?.status == 201 || response?.status == 202) {
                    return response?.data?.data
                } else {
                    throw new Error(response)
                }
            })
            .catch((error: any) => {
                showError(error);
                return { error: true, message: error?.message }
            });
    },
};

export default apis;
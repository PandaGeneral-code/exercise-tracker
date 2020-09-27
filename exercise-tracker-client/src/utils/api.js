import axios from "axios";

const axiosClient = axios.create({ baseURL: "/api" });

export const get = (url) => axiosClient.get(url);

export const post = (url, body) => {};

import axios from "axios";

const axiosClient = axios.create({ baseURL: "api" });

axiosClient.interceptors.response.use(
  (response) => response,
  (err) => {
    console.log(err);
    return err;
  }
);

export const get = (url) => axiosClient.get(url);

export const post = (url, body) => axiosClient.post(url, body);

import axios from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

export const post = async (path, data = {}, options = {}) => {
  const response = await httpRequest.post(path, data, options);
  return response.data?.data || response.data;
};

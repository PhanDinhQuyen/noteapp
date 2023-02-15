import axios from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

const accessToken = localStorage.getItem("accessToken");
const configOptions = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};
export const post = async (path, data = {}, options = configOptions) => {
  const response = await httpRequest.post(path, data, options);
  if (response.status === 403) {
    return null;
  }
  return response.data?.data || response.data;
};

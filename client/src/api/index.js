import axios from "axios";

export default (baseURL) => {
  return axios.create({
    baseURL,
    headers: "application/json",
  });
};

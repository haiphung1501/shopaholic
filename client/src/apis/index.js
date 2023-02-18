import axios from "axios";

export const getAllProductReq = (keyword = "") =>
  axios.get(`http://localhost:4000/api/product?search=${keyword}`);

export const getProductDetailReq = (id) =>
  axios.get(`http://localhost:4000/api/product/${id}`);

export const getAllCategory = () =>
  axios.get("http://localhost:4000/api/product/category");

export const userLoginReq = (email, password) => {
  return axios.post("http://localhost:4000/api/user/login", {
    email,
    password,
  });
};

export const userRegisterReq = (name, email, password) => {
  return axios.post("http://localhost:4000/api/user/register", {
    name,
    email,
    password,
  });
};

export const userLogoutReq = () => {
  return axios.post("http://localhost:4000/api/user/logout");
};

import axios from "axios";

export const getAllProductReq = (keyword = "") =>
  axios.get(`http://localhost:4000/api/product?search=${keyword}`);

export const getProductDetailReq = (id) =>
  axios.get(`http://localhost:4000/api/product/${id}`);

export const getAllCategory = () =>
  axios.get("http://localhost:4000/api/product/category");

export const userLoginReq = async (email, password) => {
  return axios.post(
    "http://localhost:4000/api/user/login",
    {
      email,
      password,
    },
    { withCredentials: true }
  );
};

export const userRegisterReq = (name, email, password) => {
  return axios.post("http://localhost:4000/api/user/register", {
    name,
    email,
    password,
  });
};

export const userLogoutReq = async () => {
  return await axios.post("http://localhost:4000/api/user/logout", {
    withCredentials: true,
  });
};

export const userLoadReq = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.get("http://localhost:4000/api/user/me", config);
};

export const userUpdateReq = async (userData) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.post(
    "http://localhost:4000/api/user/me/update",
    userData,
    config
  );
};

export const userUpdatePasswordReq = async (userData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  console.log(userData);
  return await axios.post(
    "http://localhost:4000/api/user/me/updatepassword",
    userData,
    config
  );
};

export const getOneProductReq = async (id) => {
  return await axios.get(`http://localhost:4000/api/product/${id}`);
};

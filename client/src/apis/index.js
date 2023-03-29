import axios from "axios";

const baseURL = "http://localhost:4000";

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

export const createOrderReq = async (order) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.post("http://localhost:4000/api/order/new", order, config);
};

export const getMyOrdersReq = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.get("http://localhost:4000/api/order/me", config);
};

export const getSingleOrderReq = async (id) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.get(`http://localhost:4000/api/order/${id}`, config);
};

export const getAllOrdersReq = async () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.get("http://localhost:4000/api/order/me", config);
};

export const createReviewReq = async (rating, comment, productId) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.put(
    "http://localhost:4000/api/product/review",
    { rating, comment, productId },
    config
  );
};

//ADMIN

export const adminGetAllProductsReq = async () => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.get(
    "http://localhost:4000/api/product/admin/products",
    config
  );
};

export const adminGetAllUsersReq = async () => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.get(baseURL + "/api/user/admin/users", config);
};

export const adminGetAllOrdersReq = async () => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.get(
    "http://localhost:4000/api/order/admin/orders",
    config
  );
};
export const adminCreateProductReq = async (productData) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.post(
    "http://localhost:4000/api/product/",
    productData,
    config
  );
};
export const adminDeleteProductReq = async (id) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.delete(`http://localhost:4000/api/product/${id}`, config);
};
export const adminDeleteOrderReq = async (id) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.delete(
    `http://localhost:4000/api/order/admin/order/${id}`,
    config
  );
};
export const adminDeleteUserReq = async (id) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.delete(baseURL + `/api/user/admin/user/${id}`, config);
};
export const adminUpdateOrderReq = async (id, orderData) => {
  const config = {
    headers: {
      Cookies: document.cookie,
    },
    withCredentials: true,
  };
  return await axios.put(
    baseURL + `/api/order/admin/order/${id}`,
    orderData,
    config
  );
};

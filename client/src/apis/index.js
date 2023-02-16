import axios from "axios";

// export const getReportByCountry = (country) => axios.get(`https://api.covid19api.com/total/dayone/country/${country}`)

export const getAllProductReq = (keyword = "") =>
  axios.get(`http://localhost:4000/api/product?search=${keyword}`);

export const getProductDetailReq = (id) =>
  axios.get(`http://localhost:4000/api/product/${id}`);

export const getAllCategory = () =>
  axios.get("http://localhost:4000/api/product/category");

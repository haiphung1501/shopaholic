import axios from "axios";

// export const getReportByCountry = (country) => axios.get(`https://api.covid19api.com/total/dayone/country/${country}`)

export const getAllProductReq = () => axios.get("http://localhost:4000/api/product/")
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
};

export const fetchAllProducts = () => {
  return axios.get(
    "/api/product/getAllProducts",
    config
  );
}

export const fetchActiveProducts = () => {
  return axios.get(
    "/api/product/getActiveProducts",
    config
  );
}
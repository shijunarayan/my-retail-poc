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

export const getProductByID = (productID) => {
  return axios.get(
    `/api/product/getProductByID/${productID}`,
    config
  );
}

export const bulkUpdateProductPrice = (updatedProducts) => {
  return axios.post(
    "/api/product/bulkUpdateProductPrice",
    { updatedProducts: updatedProducts },
    config
  );
}
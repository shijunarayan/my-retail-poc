import axios from "axios";

const config = {
  header: {
    "Content-Type": "application/json",
  },
};

export const fetchProducts = () => {
  return axios.get(
    "/test",
    config
  );
}
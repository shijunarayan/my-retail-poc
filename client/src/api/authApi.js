import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json"
  },
};

export const forgotPassword = (email) => {
  return axios.post(
    "/api/auth/forgotpassword",
    { email: email },
    config
  );
}
export const resetPassword = (resetToken, password) => {
  return axios.put(
    `/api/auth/resetPassword/${resetToken}`,
    { password: password },
    config
  );
}
import axios from "axios";

const BASEURL = import.meta.env.VITE_BASE_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASEURL}/auth/user/login`, {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);

    return response.data.user;
  } catch (error) {
    console.error(error);
    return;
  }
};

export const register = async (email, password, phone, location) => {
  try {
    const response = await axios.post(`${BASEURL}/auth/user/register`, {
      email,
      password,
      phone,
      location,
    });

    return response.data.user;
  } catch (error) {
    console.error(error);
    return;
  }
};

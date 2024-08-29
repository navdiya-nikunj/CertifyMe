import axios from "axios";

const instance = axios.create({
  baseURL: "https://certify-me-mu.vercel.app/",
});

export default instance;

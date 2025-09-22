import axios from "axios";
export default axios.create({
  baseURL: import.meta.env.VITE_OW_URL,
  validateStatus: (status) => !(status >= 500)
});
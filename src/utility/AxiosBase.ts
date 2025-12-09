import axios from "axios";
export default axios.create({
  baseURL: "/api",
  validateStatus: (status) => !(status >= 500)
});
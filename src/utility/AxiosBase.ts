import axios from "axios";
export default axios.create({
  baseURL: "/ow_api",
  validateStatus: (status) => !(status >= 500)
});
import axios from "axios";
// const baseURL = import.meta.env.DEV ? "/api" : (import.meta.env.VITE_OW_URL ?? "/");
// dev proxy from [vite.config.ts](vite.config.ts)
export default axios.create({ baseURL: "/api" });
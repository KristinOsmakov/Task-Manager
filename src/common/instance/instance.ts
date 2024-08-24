import axios from 'axios'

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "32511c99-28de-44d1-9df6-b2ae2555b019",
    // "API-KEY": process.env.REACT_APP_API_KEY,
  },
});
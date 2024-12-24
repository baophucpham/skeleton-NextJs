import { APIConfig } from ".";
import { API_BASE_URL } from "../env";
import { baseHeader } from "./config";

const userApiConfig = {
  "user-info/get": {
    url: `${API_BASE_URL}/ecom-service/users/info`,
    options: {
      headers: baseHeader,
      method: "GET",
    },
  },
  "user-info/update": {
    url: `${API_BASE_URL}/ecom-service/users`,
    options: {
      headers: baseHeader,
      method: "PUT",
    },
  },
} as APIConfig;

export default userApiConfig;

import { APIConfig } from ".";
import { API_BASE_URL } from "../env";
import { baseHeader } from "./config";

const authApiConfig = {
  "auth/login": {
    url: `${API_BASE_URL}/auth-service/auth/login?fromWeb=true`,
    options: {
      headers: baseHeader,
      method: "POST",
    },
  },
  "auth/signup": {
    url: `${API_BASE_URL}/ecom-service/public/epc-signup`,
    options: {
      headers: baseHeader,
      method: "POST",
    },
  },
} as APIConfig;

export default authApiConfig;

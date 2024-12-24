import { APIConfig } from ".";
import { API_BASE_URL } from "../env";
import { baseHeader } from "./config";

const passwordApiConfig = {
  "forgot-password": {
    url: `${API_BASE_URL}/auth-service/auth/forgot-password`,
    options: {
      headers: baseHeader,
      method: "POST",
    },
  },
  "checkotp": {
    url: `${API_BASE_URL}/auth-service/auth/forgot-password/check-otp`,
    options: {
      headers: baseHeader,
      method: "POST",
    },
  },
  "reset-password": {
    url: `${API_BASE_URL}/auth-service/auth/reset-password`,
    options: {
      headers: baseHeader,
      method: "POST",
    },
  },
  "change-password": {
    url: `${API_BASE_URL}/auth-service/auth/change-password`,
    options: {
      headers: baseHeader,
      method: "POST",
    },
  },
} as APIConfig;

export default passwordApiConfig;

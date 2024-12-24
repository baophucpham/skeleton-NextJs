import { APIConfig } from ".";
import { API_BASE_URL } from "../env";
import { baseHeader } from "./config";

const addressApiConfig = {
  "address/create": {
    url: `${API_BASE_URL}/ecom-service/users/addresses`,
    options: {
      headers: baseHeader,
      method: "POST",
    },
  },
  "address-list/get": {
    url: `${API_BASE_URL}/ecom-service/users/addresses`,
    options: {
      headers: baseHeader,
      method: "GET",
    },
  },
  "address-detail/get": {
    url: `${API_BASE_URL}/ecom-service/users/addresses/:id`,
    options: {
      headers: baseHeader,
      method: "GET",
    },
  },
  "address/update": {
    url: `${API_BASE_URL}/ecom-service/users/addresses/:id`,
    options: {
      headers: baseHeader,
      method: "PUT",
    },
  },
  "address/delete": {
    url: `${API_BASE_URL}/ecom-service/users/addresses/:id`,
    options: {
      headers: baseHeader,
      method: "DELETE",
    },
  },
} as APIConfig;

export default addressApiConfig;

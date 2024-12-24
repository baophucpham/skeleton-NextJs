import { APIConfig } from ".";
import { API_BASE_URL } from "../env";
import { baseHeader } from "./config";

const QuoteManagementApiConfig = {
  "quote-management-dropdown/get": {
    url: `${API_BASE_URL}/ecom-service/quotes/dropdown`,
    options: {
      headers: baseHeader,
      method: "GET",
    },
  },
  "quote/create": {
    url: `${API_BASE_URL}/ecom-service/quotes`,
    options: {
      headers: baseHeader,
      method: "POST",
    },
  },
  "quote/update": {
    url: `${API_BASE_URL}/ecom-service/quotes`,
    options: {
      headers: baseHeader,
      method: "PUT",
    },
  },
  "quote-detail/get": {
    url: `${API_BASE_URL}/ecom-service/quotes/:id`,
    options: {
      headers: baseHeader,
      method: "GET",
    },
  },
} as APIConfig;

export default QuoteManagementApiConfig;

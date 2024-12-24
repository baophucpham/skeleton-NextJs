import authApiConfig from "./auth";
import userApiConfig from "./user";
import passwordApiConfig from "./password";
import addressApiConfig from "./address";
import QuoteManagementApiConfig from "./quote-management";

export type APIConfig = {
  [key: string]: {
    url: string;
    options: {
      headers: Record<string, string>;
      method: string;
    };
  };
};

export default {
  ...authApiConfig,
  ...userApiConfig,
  ...passwordApiConfig,
  ...addressApiConfig,
  ...QuoteManagementApiConfig,
};

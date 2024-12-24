import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  const locale = "vn";

  const messages = {
    ...(await import(`./locales/${locale}/auth.json`)).default,
    ...(await import(`./locales/${locale}/common.json`)).default,
    ...(await import(`./locales/${locale}/userInfo.json`)).default,
    ...(await import(`./locales/${locale}/quote.json`)).default,
  };

  return {
    locale,
    messages,
  };
});

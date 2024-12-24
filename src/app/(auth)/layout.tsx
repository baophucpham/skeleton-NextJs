import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";

import QueryClientProviderWrapper from "../query-client-provider-wrapper";
import StyledComponentsRegistry from "../registry";
import "../globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "STRIDE Ecommerce",
  description: "stride Ecommerce",
};

const config: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <AntdRegistry>
            <ConfigProvider theme={config}>
              <StyledComponentsRegistry>
                <QueryClientProviderWrapper>
                  {children}
                  <ToastContainer
                    position='top-right'
                    autoClose={3000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />
                </QueryClientProviderWrapper>
              </StyledComponentsRegistry>
            </ConfigProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

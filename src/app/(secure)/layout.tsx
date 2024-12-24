import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Layout, ConfigProvider } from "antd";
import { Content } from "antd/es/layout/layout";
import type { ThemeConfig } from "antd";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "../globals.scss";
import QueryClientProviderWrapper from "../query-client-provider-wrapper";
import StyledComponentsRegistry from "../registry";
import FooterComponent from "@/components/footer";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "STRIDE Ecommerce",
  description: "stride Ecommerce",
};

const config: ThemeConfig = {
  token: {
    colorPrimary: "#1890ff",
  },
  components: {
    Carousel: {
      dotOffset: -15,
      dotGap: 2,
    },
    Layout: {
      bodyBg: "#f7faff",
      headerBg: "#ffffff",
      headerHeight: 84,
    },
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
                  <section>
                    <Layout>
                      <Header />
                      <Content style={{ padding: "20px 48px" }}>
                        {children}
                      </Content>
                      <FooterComponent type='default' />
                    </Layout>
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
                  </section>
                </QueryClientProviderWrapper>
              </StyledComponentsRegistry>
            </ConfigProvider>
          </AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

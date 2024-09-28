import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import QueryClientProviderWrapper from "./QueryClientProviderWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "STRIDE Ecommerce",
  description: "stride Ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
      </body>
    </html>
  );
}

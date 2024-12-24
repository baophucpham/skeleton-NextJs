"use client";
import FooterComponent from "@/components/footer";
import HeaderComponent from "@/components/header";
import { Spin } from "antd";
import { useEffect, useState } from "react";

export default function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Artificial delay for demo purposes; replace with your actual logic
    const timeout = setTimeout(() => {
      setIsLoading(false); // Set loading to false when styles are ready
    }, 500); // Adjust the timeout based on your need

    return () => clearTimeout(timeout); // Clean up the timeout when the component unmounts
  }, []);

  if (isLoading) {
    // Render a loading spinner or any other placeholder while waiting for CSS to load
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size='large' /> {/* Ant Design's loading spinner */}
      </div>
    );
  }
  return (
    <section>
      {children}
      <FooterComponent type='login' />
    </section>
  );
}

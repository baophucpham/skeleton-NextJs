import React from "react";
import { Breadcrumb } from "antd";
import { useTranslations } from "next-intl";
import Title from "antd/es/typography/Title";
import { ROUTE_CONFIG } from "@/constants";

const QuoteDetailLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  const t = useTranslations();
  const { id } = params;
  const breadcrumbItems = [
    {
      title: t("quote_list"),
      href: ROUTE_CONFIG.QUOTE_MANAGEMENT.LIST,
    },
    {
      title: id === "create" ? t("create") : id,
    },
  ];

  return (
    <>
      <Title level={3}>{t("quote_request")}</Title>
      <Breadcrumb items={breadcrumbItems} />
      {children}
    </>
  );
};

export default QuoteDetailLayout;

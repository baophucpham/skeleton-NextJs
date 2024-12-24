import React from "react";
import Title from "antd/es/typography/Title";
import { useTranslations } from "next-intl";

const QuoteManagementLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();

  return (
    <div>
      <Title level={3}>{t("quote_list")}</Title>
      {children}
    </div>
  );
};

export default QuoteManagementLayout;

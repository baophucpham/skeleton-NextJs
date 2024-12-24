import React from "react";
import { Card, Tabs } from "antd";
import { useTranslations } from "next-intl";

import QuoteTable from "./components/quote-table";
import { QuoteStatus } from "@/types";

const QuoteListPage = () => {
  const isReviewer = false;
  const t = useTranslations();
  const defaultItems = [
    {
      key: QuoteStatus.PENDING_REVIEW,
      label: t("pending_review"),
      children: (
        <QuoteTable
          status={QuoteStatus.PENDING_REVIEW}
          isReviewer={isReviewer}
        />
      ),
    },
    {
      key: QuoteStatus.APPROVED,
      label: t("approved"),
      children: (
        <QuoteTable status={QuoteStatus.APPROVED} isReviewer={isReviewer} />
      ),
    },
    {
      key: QuoteStatus.REJECTED,
      label: t("rejected"),
      children: (
        <QuoteTable status={QuoteStatus.REJECTED} isReviewer={isReviewer} />
      ),
    },
    {
      key: QuoteStatus.CANCELLED,
      label: t("cancelled"),
      children: (
        <QuoteTable status={QuoteStatus.CANCELLED} isReviewer={isReviewer} />
      ),
    },
  ];

  const items = isReviewer
    ? defaultItems
    : [
        {
          key: QuoteStatus.NEW,
          label: t("new"),
          children: (
            <QuoteTable status={QuoteStatus.NEW} isReviewer={isReviewer} />
          ),
        },
        ...defaultItems,
      ];

  return (
    <Card>
      <Tabs type='card' items={items} />
    </Card>
  );
};

export default QuoteListPage;

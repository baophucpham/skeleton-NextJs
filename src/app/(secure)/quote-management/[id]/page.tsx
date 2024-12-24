import React from "react";
import { Flex } from "antd";
import { Content } from "antd/es/layout/layout";
import QuoteDetail from "./components/quote-detail";

const QuoteDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <Content style={{ padding: "40px 0" }}>
      <Flex vertical gap={20}>
        <QuoteDetail quoteId={id} />
      </Flex>
    </Content>
  );
};

export default QuoteDetailPage;

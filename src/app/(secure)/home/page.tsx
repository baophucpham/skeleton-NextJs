import React from "react";
import { Flex } from "antd";

import ProductList from "./components/product-list";
import CarouselPromo from "./components/carousel-promo";

const HomePage = () => {
  return (
    <Flex vertical gap={50}>
      <CarouselPromo />
      <ProductList />
    </Flex>
  );
};

export default HomePage;

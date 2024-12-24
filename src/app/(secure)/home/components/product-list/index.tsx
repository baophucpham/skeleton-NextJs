"use client";
import React, { useState } from "react";
import { Typography } from "antd";

import ProductListWrapper from "./product-list.styled";
import { useTranslations } from "next-intl";

const MOCK_DATA = [
  {
    label: "All",
    img: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
  },
  {
    label: "Solar Panel",
    img: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
  },
  {
    label: "Battery",
    img: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
  },
  {
    label: "Inverter",
    img: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
  },
];

const MOCK_BRAND_LIST = Array.from({ length: 20 }).map((_, i) => ({
  name: `BrandBrand BrandBrandBrand BrandBrandBrand ${i}`,
}));

const MOCK_PRODUCT_LIST = Array.from({ length: 20 }).map((_, i) => ({
  name: `ProductProd uct ProductProdu ctProd uct numbenumberr nunumbermber  ${i}`,
  img:
    i % 2
      ? "https://cdn11.bigcommerce.com/s-bi8c0htqsn/images/stencil/1280x1280/products/2834/2852/53a0a772-6033-4e2c-95ee-13c56886cfe3__94471.1692302362.jpg?c=1"
      : "https://i0.wp.com/mysolarsolutions.ca/wp-content/uploads/2023/06/HES-50W-Solar-Panel-for-12V-Systems.jpg?fit=1080%2C1080&ssl=1",
}));

const ProductList = () => {
  const t = useTranslations();
  const [categorySelect, setCategorySelect] = useState("All");

  return (
    <ProductListWrapper>
      <div>
        <Typography.Title level={3} style={{ textAlign: "center" }}>
          {t("browse_by_categories")}
        </Typography.Title>
        <ul className='categories-list'>
          {MOCK_DATA.map(({ img, label }, i) => (
            <li
              key={i}
              className={`categories-item ${
                label === categorySelect ? "active" : ""
              }`}
              onClick={() => setCategorySelect(label)}
            >
              <div className='icon'>
                <img src={img} alt='categories' />
              </div>
              <Typography.Text>{label}</Typography.Text>
            </li>
          ))}
        </ul>
      </div>
      <div className='product-list-container'>
        <section className='brands'>
          <Typography.Title level={3}>{t("brands")}</Typography.Title>
          <ul className='brand-list'>
            {MOCK_BRAND_LIST.map(({ name }) => (
              <li>
                <Typography.Text>{name}</Typography.Text>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <Typography.Title level={3}>{t("products")}</Typography.Title>
          <div className='product-list'>
            {MOCK_PRODUCT_LIST.map(({ name, img }, i) => (
              <div className='product-item' key={i}>
                <div className='product-img'>
                  <img src={img} alt='product-img' />
                </div>
                <Typography.Text>{name}</Typography.Text>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ProductListWrapper>
  );
};

export default ProductList;

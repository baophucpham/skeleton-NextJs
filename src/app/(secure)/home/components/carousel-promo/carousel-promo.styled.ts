import { Carousel } from "antd";
import styled from "styled-components";

export const CarouselWrapper = styled(Carousel)`
  margin-bottom: 20px;

  > .slick-list {
    border-radius: 10px;
    overflow: hidden;
  }

  > .slick-dots li button {
    width: 8px;
    height: 8px;
    background: #9cc3f7;
    border-radius: 50%;
  }

  > .slick-dots li.slick-active button {
    width: 20px;
    background: #1890ff;
    border-radius: 5px;
  }

  .carousel-item {
    height: 450px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

import { truncate } from "@/utilities";
import styled from "styled-components";

const ProductListWrapper = styled.div`
  .categories-list {
    display: flex;
    justify-content: center;
    gap: min(50px, 5%);
  }

  .categories-item {
    text-align: center;
    cursor: pointer;

    .icon {
      --size: min(100px, 15vw);
      border-radius: 50%;
      width: var(--size);
      height: var(--size);
      overflow: hidden;
      outline: 1px solid #9cc3f7;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;

      img {
        width: 65%;
        height: 65%;
        object-fit: contain;
      }
    }

    &.active {
      .icon {
        outline-color: #1890ff;
        outline-width: 2px;
      }

      .ant-typography {
        color: #1890ff;
      }
    }
  }

  .product-list-container {
    margin-top: 30px;
    display: grid;
    grid-template-columns: min(300px, 15vw) 1fr;
    gap: 30px;

    section {
      background-color: white;
      border-radius: 10px;
      padding: 25px;
      outline: 1px solid #9cc3f7;
    }

    .brands {
      align-self: start;
    }
  }

  .brand-list li {
    height: 25px;
    cursor: pointer;

    &:hover .ant-typography {
      color: #1890ff;
    }

    .ant-typography {
      ${truncate("100%")}
    }
  }

  .product-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 25px;
  }

  .product-item {
    text-align: center;

    .ant-typography {
      ${truncate("100%", 2)}
    }
  }

  .product-img {
    width: 100%;
    height: 80%;
    margin-bottom: 10px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

export default ProductListWrapper;

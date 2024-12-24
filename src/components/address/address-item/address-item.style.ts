import styled from "styled-components";

export const StyledAddressItem = styled.div`
  margin: 1rem 2rem;
  padding: 1rem 1rem 1rem 1rem;
  border: 1px solid #1677ff;
  border-radius: 10px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  .note {
    padding: 8px 0;
    color: #797979d6;
  }
  .iconFunc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }

  .icon{
    display: flex;
    padding-right: 5px;
  }

  .iconItem {
    display: flex;
    justify-content: center;
    height: 35px;
    width: 35px;
    cursor: pointer;
    &:hover {
      border: 1px solid #1677ff;
      border-radius: 20px;
    }
  }
`;
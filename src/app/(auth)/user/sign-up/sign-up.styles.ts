import styled from "styled-components";

export const StyledSignup = styled.div`
  .viewLoginForm {
    background-color: #ffffff45;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-radius: 12px;
    border: 1px solid #ffffff;
    width: 40%;
    padding: 32px 24px 32px 24px;
    font-weight: 700;
    font-size: 25px;
    line-height: 30px;
    color: #ffffff;
  }
  .titleInput {
    color: #ffffff;
  }
  .formSignUp {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .inputText {
    width: 100%;
    height: 35px;
  }
  .InputView {
    width: 47%;
  }
  .ButtonSignup {
    height: 48px;
    border-radius: 12px;
    background-color: #ffc200;
    color: #0f2442;
    font-weight: 600;
    line-height: 24px;
    &:hover {
      background-color: #ffc200 !important;
      color: #0f2442 !important;
    }
  }
  .imageLogo {
    width: 100px;
    height: 40.88px;
  }
  .viewImageLogo {
    width: 100%;
    position: fixed;
    top: 0;
    padding: 26px 0px 0px 44px;
  }
  .errorMessage{
    margin: 0 0 1rem 0;
    font-size: 16px;
  }
  .iconQues{
    display: inline;
    margin-left: 12px;
  }
`;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button, Form, Input } from "antd";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import strideLogoImage from "../../../../../public/assets/image/Stride-White-logo.png";
import { StyledForgotPass } from "./forgot-password.styles";
import useMutationApi from "@/hooks/useMutationApi";

interface BodyForgotPass {
  email: String;
  otp: String;
  password: String;
  retyPassword: String;
}

interface ErrorMessages {
  otp?: String;
  email?: String;
  password?: String;
  retyPassword?: String;
}

const ForgotPasswordPage = () => {
  const t = useTranslations();
  const router = useRouter();

  const [dataInput, setDataInput] = useState<Partial<BodyForgotPass>>({});
  const [isOtpScreen, setIsOtpScreen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>({});
  const [isChangePasswordScreen, setIsChangePasswordScreen] = useState(false);

  const { mutateAsync: mutateForgotPassword } = useMutationApi(
    "forgot-password",
    { onError: () => toast.error(t("email_wrong_format")) }
  );

  const { mutateAsync: mutateCheckOTP } = useMutationApi("checkotp", {
    onError: () => toast.error(t("otp_wrong")),
  });

  const { mutateAsync: mutateResetPassword } = useMutationApi("reset-password");

  const onFinish = async (values: any) => {
    setDataInput({ ...dataInput, ...values });
    if (!isOtpScreen && !isChangePasswordScreen) {
      const isValid = await forgotPasword(values);
      setIsOtpScreen(isValid);
    }
    if (isOtpScreen && !isChangePasswordScreen) {
      const bodyCheckOtp: Partial<BodyForgotPass> = {
        ...dataInput,
        ...values,
      };
      const isValidOtp = await checkOtp(bodyCheckOtp);
      if (isValidOtp) {
        setIsOtpScreen(false);
        setIsChangePasswordScreen(true);
      }
    }
    if (isChangePasswordScreen) {
      const isValid = onCheckMatchPass(values.password, values.reTypePassword);
      if (isValid) {
        const bodyForSend: Partial<BodyForgotPass> = {
          email: dataInput.email,
          otp: dataInput.otp,
          password: values.password,
        };
        const resetValid = await resetPassword(bodyForSend);
        if (resetValid) {
          handleNavigateToLogin();
        }
      }
    }
  };

  const resetPassword = async (body: Partial<BodyForgotPass>) => {
    const response: any = await mutateResetPassword(body);
    if (!response?.success) {
      toast.error(response.errorDetails.message);
      return false;
    }
    toast.success(t("password_changed_success"));
    return true;
  };

  const onCheckMatchPass = (
    password: String = "",
    reTypePassword: String = ""
  ) => {
    if (password !== reTypePassword) {
      toast.error(t("password_confirm_wrong"));
      return false;
    }

    return true;
  };

  const forgotPasword = async (data: Partial<BodyForgotPass>) => {
    const response: any = await mutateForgotPassword(data);
    if (response?.success) {
      return true;
    }
    return false;
  };

  const checkOtp = async (data: Partial<BodyForgotPass>) => {
    const response: any = await mutateCheckOTP(data);
    if (response?.success && response?.data.message !== "false") {
      return true;
    }
    return false;
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    setErrorMessage({});
  };

  const handleNavigateToLogin = () => {
    router.replace("/user/login");
  };
  return (
    <StyledForgotPass>
      <div className='login-container'>
        <div className='viewImageLogo'>
          <Image className='imageLogo' alt='' src={strideLogoImage} />
        </div>

        {isChangePasswordScreen ? (
          <div className='viewLoginForm'>
            <div>{t("change_password")}</div>
            <Form
              name='loginForm'
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout='vertical'
            >
              <Form.Item
                className='InputView'
                label={<span className='titleInput'>{t("password")}</span>}
                name='password'
                rules={[{ required: true, message: t("password_required") }]}
              >
                <Input.Password className='inputText' />
              </Form.Item>
              <Form.Item
                className='InputView'
                label={
                  <span className='titleInput'>{t("password_confirm")}</span>
                }
                name='reTypePassword'
                rules={[
                  { required: true, message: t("password_confirm_required") },
                ]}
              >
                <Input.Password className='inputText' />
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='ButtonLogin'
                  block
                >
                  {t("update_password")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <div className='viewLoginForm'>
            <div>{t("forgot_password")}</div>
            <Form
              name='loginForm'
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout='vertical'
            >
              {isOtpScreen ? (
                <>
                  <Form.Item
                    label={<span className='titleInput'>{t("otp")}</span>}
                    name='otp'
                    rules={[{ required: true, message: t("otp_required") }]}
                    validateStatus={errorMessage.otp ? "error" : undefined}
                    help={errorMessage.otp ? errorMessage.otp : undefined}
                  >
                    <Input
                      className='inputText'
                      placeholder={t("otp_placeholder")}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='ButtonLogin'
                      block
                    >
                      {t("next")}
                    </Button>
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item
                    label={<span className='titleInput'>{t("email")}</span>}
                    name='email'
                    rules={[{ required: true, message: t("email_required") }]}
                    validateStatus={errorMessage.email ? "error" : undefined}
                    help={errorMessage.email ? errorMessage.email : undefined}
                  >
                    <Input
                      className='inputText'
                      placeholder={t("email_placeholder")}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='ButtonLogin'
                      block
                    >
                      {t("get_new_password")}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form>
          </div>
        )}
      </div>
    </StyledForgotPass>
  );
};

export default ForgotPasswordPage;

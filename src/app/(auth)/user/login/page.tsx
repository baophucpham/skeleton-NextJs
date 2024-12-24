"use client";
import React, { useEffect } from "react";
import { Input, Form, Button, Checkbox } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

import strideLogoImage from "../../../../../public/assets/image/Stride-White-logo.png";

import { StyledLogin } from "./login.styles";
import { decryptData, encryptData } from "@/utilities/utils";
import useMutationApi from "@/hooks/useMutationApi";
import { STORAGE_KEY } from "@/constants";

interface BodyLogin {
  username: String;
  password: String;
}

const LoginPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const [form] = Form.useForm();
  const { mutateAsync: mutateLogin } = useMutationApi("auth/login", {
    onError: () => {
      toast.error(t("email_password_wrong"));
    },
  });

  useEffect(() => {
    const getInfo: any = localStorage.getItem(STORAGE_KEY.LOGIN_INFO);
    const data = decryptData(getInfo);
    const res: Partial<BodyLogin> = data ? JSON.parse(data) : "";
    if (res) {
      form.setFieldsValue({
        username: res.username,
        password: res.password,
        rememberLogin: true,
      });
    }
  }, [form]);

  const onFinish = async (values: any) => {
    const body: BodyLogin = {
      username: values.username,
      password: values.password,
    };

    const response: any = await mutateLogin(body);
    if (response?.success) {
      if (values.rememberLogin) {
        const textBody = encryptData(JSON.stringify(body));
        localStorage.setItem(STORAGE_KEY.LOGIN_INFO, textBody);
      } else {
        localStorage.removeItem(STORAGE_KEY.LOGIN_INFO);
      }
      const base64 = response?.data?.accessToken
        ? response?.data?.accessToken.split(".")[1]
        : "";
      const jsonString = atob(base64);

      // Step 2: Convert the JSON string to an object
      const jsonObject = JSON.parse(jsonString);

      localStorage.setItem(STORAGE_KEY.USER_TYPE, jsonObject._type);
      localStorage.setItem(
        STORAGE_KEY.ACCESS_TOKEN,
        response?.data?.accessToken
      );
      localStorage.setItem(STORAGE_KEY.AUTHORITIES, jsonObject.authorities);
      router.push("/dashboard/user");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleNavigateSignUp = () => {
    router.push("/user/sign-up");
  };
  const navigateToFogotPassPage = () => {
    router.push("/user/forgot-password");
  };

  return (
    <StyledLogin>
      <div className='login-container'>
        <div className='viewImageLogo'>
          <Image className='imageLogo' alt='' src={strideLogoImage} />
        </div>
        <div className='viewLoginForm'>
          <div>{t("login")}</div>

          <Form
            name='loginForm'
            onFinish={onFinish}
            initialValues={{
              rememberLogin: false,
              password: "",
              username: "",
            }}
            form={form}
            onFinishFailed={onFinishFailed}
            layout='vertical'
          >
            <Form.Item
              label={<span className='titleInput'>{t("email")}</span>}
              name='username'
              rules={[{ required: true, message: t("email_required") }]}
            >
              <Input
                className='inputText'
                placeholder={t("email_placeholder")}
              />
            </Form.Item>

            <Form.Item
              label={<span className='titleInput'>{t("password")}</span>}
              name='password'
              rules={[{ required: true, message: t("password_required") }]}
            >
              <Input.Password
                className='inputText'
                placeholder={t("password_placeholder")}
              />
            </Form.Item>
            <div className='forGotPass'>
              <Form.Item name='rememberLogin' valuePropName='checked'>
                <Checkbox className='titleInput'>{t("remember_me")}</Checkbox>
              </Form.Item>
              <div className='linkForgotPass' onClick={navigateToFogotPassPage}>
                {t("forgot_password")}
              </div>
            </div>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='ButtonLogin'
                block
              >
                {t("login")}
              </Button>
            </Form.Item>
          </Form>
          <div className='footerContentLogin'>
            {t("account_not_yet")}
            <div className='btnSignUp' onClick={handleNavigateSignUp}>
              {t("sign_up")}
            </div>
          </div>
        </div>
      </div>
    </StyledLogin>
  );
};

export default LoginPage;

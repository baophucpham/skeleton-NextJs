"use client";
import React, { useMemo, useRef, useState } from "react";
import {
  Input,
  Form,
  Button,
  Checkbox,
  Select,
  CheckboxProps,
  Popover,
} from "antd";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { StyledSignup } from "./sign-up.styles";
import strideLogoImage from "../../../../../public/assets/image/Stride-White-logo.png";
import useMutationApi from "@/hooks/useMutationApi";
import { isEmpty, onChangeInputPattren } from "@/utilities";
import { CUSTOMER_TYPE_OPTIONS } from "@/constants";

interface BodySignup {
  firstName: String;
  middleName: String;
  lastName: String;
  email: String;
  phone: String;
  password: String;
  customerType: String;
  companyTax: String;
  company: String;
  isSolarCompany: boolean;
}

interface MessageErrorField {
  firstName: String;
  middleName: String;
  lastName: String;
  email: String;
  phone: String;
  password: String;
  customerType: String;
  reTypePassword: String;
}

const SignUpPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const [form] = Form.useForm();
  const [isShowCompany, setIsShowCompany] = useState<boolean>(false);
  const [errorMessagesDetail, setErrorMessagesDetail] = useState<
    Partial<MessageErrorField>
  >({});
  const isSolarCompany = useRef<boolean>(false);

  const customerTypeOptions = useMemo(
    () =>
      CUSTOMER_TYPE_OPTIONS.map((option) => ({
        ...option,
        label: t(option.label),
      })),
    []
  );

  const { mutateAsync: mutateSignUp } = useMutationApi("auth/signup", {
    onError: (error: AxiosError & { errorDetails: any }) => {
      const listError = error.errorDetails;
      const errorMessage = isEmpty(listError) ? error.message : "";
      const listErrorMessageVi = {
        email: listError.email ? t("email_wrong_format") : "",
        password: listError.password ? t("password_not_meet_requirement") : "",
        phone: listError.phone ? t("phone_number_wrong_format") : "",
      };
      setErrorMessagesDetail({ ...listErrorMessageVi });

      const errorMessageVi = errorMessage.includes("Email")
        ? t("email_existed")
        : errorMessage.includes("Phone")
        ? t("phone_existed")
        : "";

      if (errorMessage !== "") {
        toast.error(errorMessageVi);
      }
    },
  });

  const onFinish = (values: any) => {
    onPostSignup(values);
  };

  const onCheckMatchPass = (
    password: String = "",
    reTypePassword: String = ""
  ) => {
    if (password !== reTypePassword) {
      setErrorMessagesDetail({
        ...errorMessagesDetail,
        reTypePassword: t("password_confirm_wrong"),
      });
      return false;
    }

    return true;
  };

  const onPostSignup = async (values: any) => {
    if (!onCheckMatchPass(values.password, values.reTypePassword)) {
      return;
    }
    const bodySendRequest: Partial<BodySignup> = {};
    if (values.customerType === "Individual") {
      bodySendRequest.firstName = values.firstName;
      bodySendRequest.middleName = values.middleName ? values.middleName : "";
      bodySendRequest.lastName = values.lastName;
      bodySendRequest.email = values.email;
      bodySendRequest.phone = values.phone;
      bodySendRequest.password = values.password;
      bodySendRequest.customerType = values.customerType;
    } else if (values.customerType === "Company") {
      bodySendRequest.firstName = values.firstName;
      bodySendRequest.middleName = values.middleName ? values.middleName : "";
      bodySendRequest.lastName = values.lastName;
      bodySendRequest.email = values.email;
      bodySendRequest.phone = values.phone;
      bodySendRequest.password = values.password;
      bodySendRequest.customerType = values.customerType;
      bodySendRequest.companyTax = values.companyTax;
      bodySendRequest.company = values.company;
      bodySendRequest.isSolarCompany = isSolarCompany.current;
    }

    const response: any = await mutateSignUp(bodySendRequest);
    if (response?.success) {
      toast.success(t("sign_up_success"));
      router.push("/user/login");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (value: string) => {
    value === "Company" ? setIsShowCompany(true) : setIsShowCompany(false);
  };

  const onChange: CheckboxProps["onChange"] = (e) => {
    isSolarCompany.current = e.target.checked;
  };

  const onChangeInput = (e: any) => {
    const value = onChangeInputPattren(e.target.value, '\\D');
    form.setFieldValue("phone", value);
  };

  return (
    <StyledSignup>
      <div className='login-container'>
        <div className='viewImageLogo'>
          <Image className='imageLogo' alt='' src={strideLogoImage} />
        </div>
        <div className='viewLoginForm'>
          <div>{t("sign_up")}</div>
          <Form
            name='loginForm'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout='vertical'
            form={form}
            autoComplete='off'
          >
            <div className='formSignUp'>
              <Form.Item
                className='InputView'
                label={<span className='titleInput'>{t("lastname")}</span>}
                name='lastName'
                rules={[{ required: true, message: t("lastname_required") }]}
              >
                <Input className='inputText' />
              </Form.Item>
              <Form.Item
                className='InputView'
                label={<span className='titleInput'>{t("middle_name")}</span>}
                name='middleName'
              >
                <Input className='inputText' />
              </Form.Item>
              <Form.Item
                className='InputView'
                label={<span className='titleInput'>{t("firstname")}</span>}
                name='firstName'
                rules={[{ required: true, message: t("firstname_required") }]}
              >
                <Input className='inputText' />
              </Form.Item>
              <Form.Item
                className='InputView'
                label={<span className='titleInput'>{t("email")}</span>}
                name='email'
                rules={[{ required: true, message: t("email_required") }]}
                validateStatus={errorMessagesDetail.email ? "error" : undefined}
                help={
                  errorMessagesDetail.email
                    ? errorMessagesDetail.email
                    : undefined
                }
              >
                <Input className='inputText' />
              </Form.Item>
              <Form.Item
                className='InputView'
                label={<span className='titleInput'>{t("password")}</span>}
                name='password'
                rules={[{ required: true, message: t("password_required") }]}
                validateStatus={
                  errorMessagesDetail.password ? "error" : undefined
                }
                help={
                  errorMessagesDetail.password
                    ? errorMessagesDetail.password
                    : undefined
                }
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
                validateStatus={
                  errorMessagesDetail.reTypePassword ? "error" : undefined
                }
                help={
                  errorMessagesDetail.reTypePassword
                    ? errorMessagesDetail.reTypePassword
                    : undefined
                }
              >
                <Input.Password className='inputText' />
              </Form.Item>
              <Form.Item
                className='InputView'
                label={<span className='titleInput'>{t("phone_number")}</span>}
                name='phone'
                rules={[
                  { required: true, message: t("phone_number_required") },
                ]}
                validateStatus={errorMessagesDetail.phone ? "error" : undefined}
                help={
                  errorMessagesDetail.phone
                    ? errorMessagesDetail.phone
                    : undefined
                }
              >
                <Input
                  maxLength={11}
                  onChange={onChangeInput}
                  className='inputText'
                />
              </Form.Item>
              <Form.Item
                className='InputView'
                label={<span className='titleInput'>{t("customer_type")}</span>}
                name='customerType'
                initialValue='Individual'
                rules={[
                  { required: true, message: t("customer_type_required") },
                ]}
              >
                <Select
                  className='inputText'
                  defaultValue='Individual'
                  onChange={handleChange}
                  options={customerTypeOptions}
                />
              </Form.Item>
              {isShowCompany ? (
                <>
                  <Form.Item
                    className='InputView'
                    label={
                      <span className='titleInput'>
                        {t("business_registration_number")}
                      </span>
                    }
                    name='companyTax'
                    rules={[
                      {
                        required: true,
                        message: t("business_registration_number_required"),
                      },
                    ]}
                  >
                    <Input className='inputText' />
                  </Form.Item>
                  <Form.Item
                    label={
                      <span className='titleInput'>{t("business_name")}</span>
                    }
                    className='InputView'
                    name='company'
                    rules={[
                      {
                        required: true,
                        message: t("business_name_required"),
                      },
                    ]}
                  >
                    <Input className='inputText' />
                  </Form.Item>
                </>
              ) : (
                <></>
              )}
            </div>
            {isShowCompany ? (
              <Form.Item name='isSolarCompany'>
                <Checkbox className='titleInput' onChange={onChange}>
                  {t("is_company_distributor")}
                  <Popover
                    title={t("is_company_distributor_popover")}
                    placement='bottom'
                  >
                    <div className='iconQues'>
                      <QuestionCircleOutlined />
                    </div>
                  </Popover>
                </Checkbox>
              </Form.Item>
            ) : (
              <></>
            )}
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='ButtonSignup'
                block
              >
                {t("sign_up")}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </StyledSignup>
  );
};

export default SignUpPage;

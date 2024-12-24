import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Tag,
} from "antd";
import Title from "antd/es/typography/Title";
import AvatarUpload from "./avatar-upload";
import Link from "antd/es/typography/Link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import useQueryApi from "@/hooks/useQueryApi";
import { isEmpty } from "@/utilities";
import useMutationApi from "@/hooks/useMutationApi";
import { CUSTOMER_TYPE_OPTIONS } from "@/constants";
import { generateCustomerFullname } from "@/helpers";

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  customerType: string;
  companyTax: string;
  company: string;
  isSolarCompany: boolean;
  status: string;
  submit: boolean;
}

const UserProfile: React.FC = () => {
  const t = useTranslations();
  const router = useRouter();
  const [form] = Form.useForm();
  const formValues = Form.useWatch([], form);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const customerTypeOptions = useMemo(
    () =>
      CUSTOMER_TYPE_OPTIONS.map((option) => ({
        ...option,
        label: t(option.label),
      })),
    []
  );

  const {
    data,
    isFetching,
    error,
    refetch: getUserInfo,
  } = useQueryApi("user-info/get", {
    staleTime: 0,
  });
  const userInfo = data?.data ?? {};

  if (error?.code === "401") {
    router.push("/user/login");
  }

  const { mutateAsync: mutateUpdateUserInfo } = useMutationApi(
    "user-info/update",
    {
      onSuccess: (res: any) => {
        if (res?.success) {
          toast.success(t("update_success"));
          getUserInfo();
        } else {
          toast.error(getErrorMessage(res));
        }
      },
      onError: (error) => {
        toast.error(t("update_failed"));
        console.error("Submission error:", error);
      },
    }
  );

  const getErrorMessage = (err: any) => {
    if (err?.message.includes("Phone")) {
      return t("phone_number_must_be_number");
    }
    return err?.message;
  };

  // Handle form submission
  const handleSubmit = async (values: FormData) => {
    if (
      formValues.isSolarCompany &&
      formValues.isSolarCompany !== userInfo.isSolarCompany
    ) {
      showModal();
      return;
    }

    await mutateUpdateUserInfo({ ...values, submit: false });
  };

  const handleReSubmit = async () => {
    await mutateUpdateUserInfo({
      ...formValues,
      submit: true /* save changes as re-submitted */,
    });
  };

  const buildStatus = (status: string) => {
    return status === "ACTIVE" ? (
      <Tag bordered={false} color='#87d068'>
        Approved
      </Tag>
    ) : status === "REJECTED" ? (
      <Tag bordered={false} color='#f50'>
        Rejected
      </Tag>
    ) : (
      <Tag bordered={false} color='#2db7f5'>
        Pending Approval
      </Tag>
    );
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
    await mutateUpdateUserInfo({
      ...formValues,
      submit: false,
      subscribe: formValues.isSolarCompany,
    });
    router.push("/user/logout");
  };

  if (isFetching || isEmpty(userInfo)) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <Spin size='large' />
      </div>
    );
  }

  return (
    <div className='user-tab'>
      <div style={{ textAlign: "center", padding: "10px" }}>
        <Title level={2}>{t("personal_information")}</Title>
      </div>
      <Row justify={"center"} align={"middle"}>
        <Col span={4} style={{ display: "flex", justifyContent: "flex-end" }}>
          <AvatarUpload />
        </Col>
        <Col span={1}></Col>
        <Col span={18}>
          <Title level={4}>
            {generateCustomerFullname(
              userInfo?.firstName,
              userInfo?.middleName,
              userInfo?.lastName
            )}
          </Title>
          <Link href='#'>{userInfo?.email}</Link>
        </Col>
      </Row>
      <Row justify={"center"} align={"middle"}>
        <Col span={20}>
          <Divider />
          <Form
            form={form}
            name='myForm'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            initialValues={userInfo}
            onFinish={handleSubmit}
            autoComplete='off'
          >
            <Form.Item
              label={t("lastname")}
              name='lastName'
              rules={[{ required: true, message: t("lastname_required") }]}
            >
              <Input name='lastName' maxLength={32} />
            </Form.Item>
            <Form.Item
              label={t("middle_name")}
              name='middleName'
              rules={[{ message: t("middle_name_required") }]}
            >
              <Input name='middleName' maxLength={32} />
            </Form.Item>
            <Form.Item
              label={t("firstname")}
              name='firstName'
              rules={[{ required: true, message: t("firstname_required") }]}
            >
              <Input name='firstName' maxLength={32} />
            </Form.Item>
            <Form.Item
              label={t("email")}
              name='email'
              rules={[{ required: true, message: t("email_required") }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label={t("phone_number")}
              name='phone'
              rules={[
                {
                  required: true,
                  message: t("phone_number_required"),
                },
                {
                  pattern: /^[0-9]+$/,
                  message: t("only_number"),
                },
              ]}
            >
              <Input name='phone' maxLength={11} />
            </Form.Item>
            {(userInfo?.customerType === "Individual" ||
              userInfo?.customerType === "Company") && (
              <Form.Item
                label={<span className='titleInput'>{t("customer_type")}</span>}
                name='customerType'
                rules={[
                  { required: true, message: t("customer_type_required") },
                ]}
              >
                <Select options={customerTypeOptions} />
              </Form.Item>
            )}
            {formValues.customerType === "Company" ? (
              <>
                <Form.Item
                  className='InputView'
                  label={<span>{t("business_registration_number")}</span>}
                  name='companyTax'
                  rules={[
                    {
                      required: true,
                      message: t("business_registration_number_required"),
                    },
                    {
                      pattern: /^[0-9]+$/,
                      message: t("only_number"),
                    },
                  ]}
                >
                  <Input name='companyTax' maxLength={32} />
                </Form.Item>
                <Form.Item
                  label={<span>{t("business_name")}</span>}
                  className='InputView'
                  name='company'
                  rules={[
                    {
                      required: true,
                      message: t("business_name_required"),
                    },
                  ]}
                >
                  <Input name='company' />
                </Form.Item>
              </>
            ) : (
              userInfo?.customerType === "Distributor" && (
                <Form.Item
                  label={<span>{t("business_name")}</span>}
                  className='InputView'
                  name='company'
                  rules={[
                    {
                      message: t("business_name_required"),
                    },
                  ]}
                >
                  <Input name='company' />
                </Form.Item>
              )
            )}
            {formValues.customerType === "Company" ? (
              <Row>
                <Col span={6}></Col>
                <Col span={18}>
                  <Form.Item name='isSolarCompany' valuePropName='checked'>
                    <Checkbox>{t("is_company_distributor")}</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            ) : (
              <></>
            )}
            {(userInfo?.customerType === "Individual" ||
              userInfo?.customerType === "Company") && (
              <Row>
                <Col span={8} style={{ textAlign: "right", paddingRight: 8 }}>
                  {t("status")}:
                </Col>
                <Col>{buildStatus(userInfo?.status)}</Col>
              </Row>
            )}
            <Divider />
            <Form.Item wrapperCol={{ offset: 8, span: 24 }}>
              <Space>
                <Button type='primary' htmlType='submit'>
                  {t("update")}
                </Button>
                {userInfo?.status === "REJECTED" && (
                  <Button htmlType='button' onClick={handleReSubmit}>
                    {t("re_submit")}
                  </Button>
                )}
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Modal
        title='Thông báo'
        open={isModalVisible}
        onOk={handleOk}
        okText='OK'
        cancelButtonProps={{ style: { display: "none" } }} // Hide the cancel button for an alert-style dialog
      >
        <p>{t("need_login_again")}</p>
      </Modal>
    </div>
  );
};

export default UserProfile;

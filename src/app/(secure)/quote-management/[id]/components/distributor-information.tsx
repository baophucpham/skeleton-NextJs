import React, { useEffect } from "react";
import { Input, Form } from "antd";
import FormItem from "antd/es/form/FormItem";
import Title from "antd/es/typography/Title";
import { useTranslations } from "next-intl";
import { QuoteDetailType } from "@/types/quote";
import { isEmpty } from "@/utilities";
import { useQuoteDetailStore } from "@/stores";

type Props = {
  userInfo: any;
  quoteDetail: QuoteDetailType;
};

const DistributorInformation: React.FC<Props> = ({ userInfo, quoteDetail }) => {
  const [form] = Form.useForm();
  const t = useTranslations();
  const { warehouseLocation } = useQuoteDetailStore((state) => state);

  const initFormValues = isEmpty(quoteDetail)
    ? {
        ...userInfo,
        name: `${userInfo?.lastName} ${userInfo?.middleName} ${userInfo?.firstName}`,
      }
    : {
        ...quoteDetail,
        name: quoteDetail.distributorName,
        email: quoteDetail.distributorEmail,
        phone: quoteDetail.distributorPhone,
      };

  useEffect(() => {
    if (warehouseLocation) {
      form.setFieldValue("warehouseLocation", warehouseLocation);
    }
  }, [warehouseLocation, form]);

  return (
    <>
      <Title level={4}>{t("distributor_contact_info")}</Title>
      <Form form={form} labelAlign='left' initialValues={initFormValues}>
        <FormItem
          label={t("name")}
          name='name'
          labelCol={{ lg: 4, xl: 3, xxl: 2 }}
          wrapperCol={{ span: 8 }}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          label={t("email_address")}
          name='email'
          labelCol={{ lg: 4, xl: 3, xxl: 2 }}
          wrapperCol={{ span: 8 }}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          label={t("phone_number")}
          name='phone'
          labelCol={{ lg: 4, xl: 3, xxl: 2 }}
          wrapperCol={{ span: 8 }}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          label={t("company")}
          name='company'
          labelCol={{ lg: 4, xl: 3, xxl: 2 }}
          wrapperCol={{ span: 8 }}
        >
          <Input disabled />
        </FormItem>
        <FormItem
          label={t("warehouse_address")}
          name='warehouseLocation'
          labelCol={{ lg: 4, xl: 3, xxl: 2 }}
          wrapperCol={{ span: 8 }}
        >
          <Input value={warehouseLocation} disabled />
        </FormItem>
      </Form>
    </>
  );
};

export default DistributorInformation;

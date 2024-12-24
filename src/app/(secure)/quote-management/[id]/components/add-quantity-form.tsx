import React, { useEffect, useState } from "react";
import { Button, Form, InputNumber } from "antd";
import { useTranslations } from "next-intl";
import { STEP_PRICE_AMOUNT } from "@/constants";
import { PriceQuantityTableItemType } from "@/types/quote";

type Props = {
  quantityList: any[];
  addItem: (value: PriceQuantityTableItemType) => void;
  disabled: boolean;
};

const AddQuantityForm: React.FC<Props> = ({
  quantityList,
  addItem,
  disabled,
}) => {
  const [form] = Form.useForm();
  const formValues = Form.useWatch([], form);
  const t = useTranslations();

  const [isAddItemDisabled, setIsAddItemDisabled] = useState(true);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => {
        if (formValues.quantityFrom < formValues.quantityTo) {
          setIsAddItemDisabled(false);
          form.validateFields(["quantityTo", "quantityFrom"]);
        }
      })
      .catch(() => {
        setIsAddItemDisabled(true);
      });
  }, [form, formValues]);

  const validateQuantityFrom = (value: number) => {
    let isNotValid = false;
    if (value) {
      for (let i = 0; i < quantityList.length; i++) {
        const { quantityFrom: itemFrom, quantityTo: itemTo } = quantityList[i];
        if (
          (itemFrom <= value && value <= itemTo) ||
          (value <= itemFrom && formValues.quantityTo >= itemFrom) ||
          (value >= itemTo && formValues.quantityTo <= itemTo)
        ) {
          isNotValid = true;
          return false;
        }
      }

      if (value >= formValues.quantityTo) {
        isNotValid = true;
      }
    }

    return !isNotValid;
  };

  const validateQuantityTo = (value: number) => {
    let isNotValid = false;
    if (value) {
      for (let i = 0; i < quantityList.length; i++) {
        const { quantityFrom: itemFrom, quantityTo: itemTo } = quantityList[i];
        if (
          (itemFrom <= value && value <= itemTo) ||
          (value <= itemFrom && formValues.quantityFrom >= itemFrom) ||
          (value >= itemTo && formValues.quantityFrom <= itemTo)
        ) {
          isNotValid = true;
          return false;
        }
      }

      if (value <= formValues.quantityFrom) {
        isNotValid = true;
      }
    }

    return !isNotValid;
  };

  const submit = (values: any) => {
    addItem(values);
    form.resetFields();
  };

  return (
    <Form form={form} layout='inline' onFinish={submit} disabled={disabled}>
      <Form.Item
        label={t("quantity_form")}
        name='quantityFrom'
        rules={[
          {
            message: t("quantity_from_required"),
            required: true,
          },
          {
            message: t("quantity_error"),
            validator: (_, value) => {
              if (validateQuantityFrom(value)) {
                return Promise.resolve();
              }
              return Promise.reject("error");
            },
          },
        ]}
      >
        <InputNumber style={{ width: 100 }} min={1} />
      </Form.Item>
      <Form.Item
        label={t("quantity_to")}
        name='quantityTo'
        rules={[
          {
            message: t("quantity_to_required"),
            required: true,
          },
          {
            message: t("quantity_error"),
            validator: (_, value) => {
              if (validateQuantityTo(value)) {
                return Promise.resolve();
              }
              return Promise.reject("error");
            },
          },
        ]}
      >
        <InputNumber style={{ width: 100 }} min={1} />
      </Form.Item>
      <Form.Item
        label={t("unit_price")}
        name='unitPrice'
        rules={[
          {
            message: t("unit_price_required"),
            required: true,
          },
        ]}
      >
        <InputNumber style={{ width: 200 }} min={1} step={STEP_PRICE_AMOUNT} />
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit' type='primary' disabled={isAddItemDisabled}>
          Add Item
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddQuantityForm;

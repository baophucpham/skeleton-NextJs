"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Typography,
} from "antd";
import { useTranslations } from "next-intl";
import Title from "antd/es/typography/Title";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import QuantityTable from "./quantity-table";
import {
  OptionItemType,
  OptionsType,
  QuoteStatus,
  StatusStep,
  SubmitType,
} from "@/types";
import { INTERNAL_EXTERNAL_LIST, ROUTE_CONFIG } from "@/constants";
import useQueryApi from "@/hooks/useQueryApi";
import { isEmpty } from "@/utilities";
import useMutationApi from "@/hooks/useMutationApi";
import { QuoteDetailType, QuoteMutationPayloadType } from "@/types/quote";
import useQuoteDetailStore from "@/stores/quote-detail";
import Loading from "@/components/loading";

const { TextArea } = Input;

type Props = {
  updateStatus: (status: StatusStep) => void;
  isReviewer: boolean;
  quoteDetail: QuoteDetailType;
};

const QuoteInformation: React.FC<Props> = ({
  updateStatus,
  isReviewer,
  quoteDetail,
}) => {
  const t = useTranslations();
  const [form] = Form.useForm();
  const formValues = Form.useWatch([], form);
  const { setWarehouseLocation } = useQuoteDetailStore((state) => state);
  const quoteStatus = quoteDetail?.status || QuoteStatus.NEW;

  const [submitable, setSubmitable] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(
    ![QuoteStatus.NEW, QuoteStatus.DRAFT].includes(quoteStatus)
  );

  const MESSAGE_SUCCESS_MAPPING = {
    [SubmitType.WAIT_FOR_APPROVAL]: t("submit_for_approval_success"),
    [SubmitType.SAVE]: t("save_quote_success"),
    [SubmitType.CANCEL]: t("cancel_quote_success"),
  };

  const MESSAGE_ERROR_MAPPING = {
    [SubmitType.WAIT_FOR_APPROVAL]: t("submit_for_approval_error"),
    [SubmitType.SAVE]: t("save_quote_error"),
    [SubmitType.CANCEL]: t("cancel_quote_error"),
  };

  const internalExternalOptions = useMemo(
    () =>
      INTERNAL_EXTERNAL_LIST.map((option) => ({
        ...option,
        label: t(option.label),
      })),
    []
  );

  // MARK: get warehouses dropdown
  const { data: warehousesResponse } = useQueryApi<
    AxiosResponse<(OptionItemType & { location: string })[]>
  >("quote-management-dropdown/get", {
    axiosConfig: {
      params: {
        name: "warehouses",
      },
    },
  });
  const warehousesOptions = warehousesResponse?.data ?? [];

  // MARK: get categories dropdown
  const { data: categoriesResponse } = useQueryApi<AxiosResponse<OptionsType>>(
    "quote-management-dropdown/get",
    {
      axiosConfig: {
        params: {
          name: "categories",
        },
      },
    }
  );
  const categorieOptions = categoriesResponse?.data ?? [];

  // MARK: get items dropdown
  const { data: itemsResponse } = useQueryApi<AxiosResponse<OptionsType>>(
    "quote-management-dropdown/get",
    {
      axiosConfig: {
        params: {
          name: "products",
          data: formValues?.category,
        },
      },
      enabled: !!formValues?.category,
      retry: false,
    }
  );
  const itemOptions = itemsResponse?.data ?? [];

  // MARK: create quote
  const { mutateAsync: mutateCreateQuote } =
    useMutationApi<AxiosResponse<{ quoteId: number }>>("quote/create");

  // MARK: update quote
  const { mutateAsync: mutateUpdateQuote } =
    useMutationApi<AxiosResponse<{ quoteId: number }>>("quote/update");

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((value) => {
        const { priceTable } = value ?? {};
        if (
          !form.isFieldsTouched() &&
          priceTable.length === quoteDetail?.priceTable.length
        )
          return;

        setSubmitable(true);
      })
      .catch(() => setSubmitable(false));
  }, [formValues]);

  const submitForm = async (type: SubmitType) => {
    const payload: QuoteMutationPayloadType = {
      ...formValues,
      type,
    };

    if (isEmpty(quoteDetail)) {
      await mutateCreateQuote(payload, {
        onSuccess: (res) => {
          const { quoteId } = res.data;
          if (type === SubmitType.WAIT_FOR_APPROVAL) {
            setIsFormDisabled(true);
          }
          window.history.replaceState(
            null,
            "",
            ROUTE_CONFIG.QUOTE_MANAGEMENT.DETAIL.replace("id", `${quoteId}`)
          );
          toast.success(MESSAGE_SUCCESS_MAPPING[type]);
        },
        onError: (error: any) => {
          toast.error(error.message ?? MESSAGE_ERROR_MAPPING[type]);
        },
      });

      return;
    }

    await mutateUpdateQuote(payload, {
      onSuccess: () => {
        if (type === SubmitType.WAIT_FOR_APPROVAL) {
          setIsFormDisabled(true);
        }
        toast.success(MESSAGE_SUCCESS_MAPPING[type]);
      },
      onError: (error: any) => {
        toast.error(error.message ?? MESSAGE_ERROR_MAPPING[type]);
      },
    });
  };

  if (isEmpty(warehousesOptions) || isEmpty(categorieOptions))
    return <Loading />;

  return (
    <>
      <Title level={4}>{t("quote_information")}</Title>
      <Form
        form={form}
        labelAlign='left'
        disabled={isFormDisabled}
        initialValues={quoteDetail}
      >
        <Form.Item
          label={t("warehouse")}
          name='warehouse'
          labelCol={{ lg: 4, xl: 3, xxl: 2 }}
          wrapperCol={{ span: 8 }}
          rules={[{ required: true, message: t("warehouse_required") }]}
        >
          <Select
            options={warehousesOptions}
            disabled={isReviewer || isFormDisabled}
            onChange={(warehouse) => {
              const warehouseLocation = warehousesOptions.find(
                ({ value }) => value === warehouse
              );

              if (warehouseLocation?.location) {
                setWarehouseLocation(warehouseLocation?.location);
              }
            }}
          />
        </Form.Item>
        <Form.Item
          label={t("category")}
          name='category'
          labelCol={{ lg: 4, xl: 3, xxl: 2 }}
          wrapperCol={{ span: 8 }}
          rules={[{ required: true, message: t("category_reuqired") }]}
        >
          <Select
            options={categorieOptions}
            disabled={isReviewer || isFormDisabled}
          />
        </Form.Item>
        <Form.Item
          label={t("item")}
          name='item'
          labelCol={{ lg: 4, xl: 3, xxl: 2 }}
          wrapperCol={{ span: 8 }}
          rules={[{ required: true, message: t("item_required") }]}
        >
          <Select
            options={itemOptions}
            disabled={isReviewer || isFormDisabled || isEmpty(itemOptions)}
          />
        </Form.Item>
        <Form.Item
          label={t("item_capacity")}
          name='itemCapacity'
          labelCol={{ lg: 4, xl: 3, xxl: 2 }}
          wrapperCol={{ span: 8 }}
          rules={[{ required: true, message: t("item_required") }]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={0}
            disabled={isReviewer || isFormDisabled}
          />
        </Form.Item>
        <Form.Item
          label={t("note")}
          name='note'
          labelCol={{ lg: 4, xl: 3, xxl: 2 }}
          wrapperCol={{ span: 12 }}
        >
          <TextArea autoSize={{ minRows: 4, maxRows: 10 }} />
        </Form.Item>
        <Form.Item
          name='priceTable'
          style={{ display: "none" }}
          rules={[{ required: true }]}
        ></Form.Item>
      </Form>
      {isReviewer && (
        <>
          <Form.Item
            labelAlign='left'
            label={t("approval_status")}
            labelCol={{ lg: 4, xl: 3, xxl: 2 }}
            wrapperCol={{ span: 12 }}
          >
            <Typography.Text type='warning'>Pending Approval</Typography.Text>
          </Form.Item>
          <Form.Item
            label=''
            labelAlign='left'
            labelCol={{ lg: 4, xl: 3, xxl: 2 }}
            wrapperCol={{ span: 12 }}
          >
            <Select options={internalExternalOptions} defaultValue='internal' />
          </Form.Item>
        </>
      )}

      <Divider />
      <QuantityTable
        formRef={form}
        isReviewer={isReviewer}
        disabled={isFormDisabled}
        initData={quoteDetail?.priceTable ?? []}
      />
      <Flex justify='flex-end'>
        {isReviewer ? (
          <Space>
            <Button
              htmlType='button'
              disabled={!submitable}
              onClick={() => submitForm(SubmitType.SAVE)}
            >
              {t("save")}
            </Button>
            <Button type='primary' htmlType='button'>
              {t("approve")}
            </Button>
            <Button
              htmlType='button'
              danger
              onClick={() => setIsRejectModalOpen(true)}
            >
              {t("reject")}
            </Button>
          </Space>
        ) : (
          <Space>
            <Button
              htmlType='button'
              disabled={!submitable}
              onClick={() => submitForm(SubmitType.SAVE)}
            >
              {t("save")}
            </Button>
            <Button
              type='primary'
              disabled={!submitable && quoteStatus !== QuoteStatus.DRAFT}
              onClick={() => submitForm(SubmitType.WAIT_FOR_APPROVAL)}
            >
              {t("submit_for_approval")}
            </Button>
            {[QuoteStatus.DRAFT, QuoteStatus.REJECTED].includes(
              quoteStatus
            ) && (
              <Button
                htmlType='button'
                danger
                onClick={() => {
                  updateStatus(StatusStep.CANCELLED);
                  submitForm(SubmitType.CANCEL);
                }}
              >
                {t("cancel")}
              </Button>
            )}
          </Space>
        )}
      </Flex>

      <Modal
        title={t("reject_reason")}
        open={isRejectModalOpen}
        // onOk={handleOk}
        onCancel={() => setIsRejectModalOpen(false)}
        okText={t("confirm")}
        cancelText={t("cancel")}
      >
        <TextArea autoSize={{ minRows: 4, maxRows: 7 }} rows={6} />
      </Modal>
    </>
  );
};

export default QuoteInformation;

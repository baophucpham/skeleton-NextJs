"use client";
import React, { useState } from "react";
import {
  Button,
  Flex,
  Form,
  FormInstance,
  InputNumber,
  Popconfirm,
  Table,
  TableProps,
  Typography,
} from "antd";
import { useFormatter, useTranslations } from "next-intl";
import AddQuantityForm from "./add-quantity-form";
import { STEP_PRICE_AMOUNT } from "@/constants";
import { PriceQuantityTableItemType } from "@/types/quote";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  record: PriceQuantityTableItemType;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const t = useTranslations();
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: t("input_required"),
            },
            {
              message: t("edit_price_not_valid"),
              validator: (_, value) => {
                if (value >= record.unitPrice) {
                  return Promise.resolve();
                }
                return Promise.reject("error");
              },
            },
          ]}
        >
          <InputNumber step={STEP_PRICE_AMOUNT} />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

type Props = {
  isReviewer: boolean;
  formRef: FormInstance;
  disabled: boolean;
  initData?: PriceQuantityTableItemType[];
};

const QuantityTable: React.FC<Props> = ({
  isReviewer,
  formRef,
  disabled,
  initData = [],
}) => {
  const [form] = Form.useForm();
  const t = useTranslations();
  const format = useFormatter();

  const [tableSource, setTableSource] =
    useState<PriceQuantityTableItemType[]>(initData);

  const [editingKey, setEditingKey] = useState(0);

  const isEditing = (record: PriceQuantityTableItemType) =>
    record.quantityFrom === editingKey;

  const defaultColumns = [
    {
      title: t("quantity_form"),
      dataIndex: "quantityFrom",
      editable: false,
    },
    {
      title: t("quantity_to"),
      dataIndex: "quantityTo",
      editable: false,
    },
    {
      title: t("unit_price"),
      dataIndex: "unitPrice",
      editable: false,
      render: (value: number) =>
        format.number(value, {
          style: "currency",
          currency: "VND",
        }),
    },
  ];

  const distributorColumns = [
    ...defaultColumns,
    {
      title: t("action"),
      width: 100,
      render: (_: any, item: PriceQuantityTableItemType) => (
        <Button
          danger
          type='link'
          onClick={() => deleteItem(item.quantityFrom)}
        >
          {t("delete")}
        </Button>
      ),
    },
  ];

  const reviewerColumns = [
    ...defaultColumns,
    {
      title: t("epc_price_individual"),
      dataIndex: "individualPrice",
      editable: true,
      render: (value: number) =>
        format.number(value, {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      title: t("epc_price_company"),
      dataIndex: "companyPrice",
      editable: true,
      render: (value: number) =>
        format.number(value, {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      title: t("epc_price_collab"),
      dataIndex: "collabPrice",
      editable: true,
      render: (value: number) =>
        format.number(value, {
          style: "currency",
          currency: "VND",
        }),
    },
    {
      title: t("action"),
      dataIndex: "action",
      width: 120,
      editable: false,
      render: (_: any, record: PriceQuantityTableItemType) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.quantityFrom)}
              style={{ marginInlineEnd: 8 }}
            >
              {t("save")}
            </Typography.Link>
            <Popconfirm
              title={t("sure_to_cancel")}
              okText={t("yes")}
              cancelText={t("no")}
              onConfirm={cancel}
            >
              <a>{t("cancel")}</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={!!editingKey} onClick={() => edit(record)}>
            {t("edit")}
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns: TableProps<PriceQuantityTableItemType>["columns"] =
    reviewerColumns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: PriceQuantityTableItemType) => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });

  const save = async (quantityFrom: number) => {
    try {
      const row = (await form.validateFields()) as PriceQuantityTableItemType;

      const newData = [...tableSource];
      const index = newData.findIndex(
        (item) => quantityFrom === item.quantityFrom
      );
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setTableSource(newData);
        setEditingKey(0);
      } else {
        newData.push(row);
        setTableSource(newData);
        setEditingKey(0);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const edit = (record: PriceQuantityTableItemType) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.quantityFrom);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const addItem = async (values: PriceQuantityTableItemType) => {
    setTableSource((prev) => {
      const newTableSource = [...prev, values].sort(
        (a, b) => a.quantityFrom - b.quantityFrom
      );
      formRef.setFieldValue("priceTable", newTableSource);

      return newTableSource;
    });
  };

  const deleteItem = (quantityFrom: number) => {
    setTableSource((prev) => {
      const newTableSource = prev.filter(
        (prevItem) => prevItem.quantityFrom !== quantityFrom
      );
      formRef.setFieldValue("priceTable", newTableSource);
      return newTableSource;
    });
  };

  return (
    <div style={{ paddingBottom: 25 }}>
      <Flex vertical gap={20}>
        {!isReviewer && (
          <AddQuantityForm
            quantityList={tableSource}
            addItem={addItem}
            disabled={disabled}
          />
        )}
        <Form form={form}>
          <Table
            components={{
              body: { cell: EditableCell },
            }}
            columns={isReviewer ? mergedColumns : distributorColumns}
            dataSource={tableSource}
            rowKey='quantityFrom'
            scroll={{ y: 550 }}
            pagination={false}
          />
        </Form>
      </Flex>
    </div>
  );
};

export default QuantityTable;

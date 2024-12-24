"use client";
import React, { useRef, useState } from "react";
import {
  Button,
  GetProp,
  Input,
  InputRef,
  Space,
  Table,
  TableColumnType,
  TableProps,
} from "antd";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { SearchOutlined } from "@ant-design/icons";
import {
  FilterDropdownProps,
  SorterResult,
  TablePaginationConfig,
} from "antd/es/table/interface";

import { QuoteStatus } from "@/types";
import { ROUTE_CONFIG } from "@/constants";

type Props = {
  status: QuoteStatus;
  isReviewer: boolean;
};

type DataType = {
  id: string;
  category: string;
  item: string;
};

type TableParams = {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
};

type DataIndex = keyof DataType;

const MOCK_DATA: DataType[] = Array.from({ length: 100 }).map((_, i) => ({
  id: `${i + 1}`,
  category: `category ${i + 1}`,
  item: `item ${i + 1}`,
}));

const QuoteTable: React.FC<Props> = ({ isReviewer }) => {
  const t = useTranslations();
  const router = useRouter();

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: TableProps<DataType>["columns"] = [
    {
      title: t("quote_id"),
      dataIndex: "id",
      ...getColumnSearchProps("id"),
      sorter: true,
    },
    {
      title: t("category"),
      dataIndex: "category",
      ...getColumnSearchProps("category"),
      sorter: true,
    },
    {
      title: t("item"),
      dataIndex: "item",
    },
    {
      title: t("requester"),
      dataIndex: "requester",
      hidden: !isReviewer,
    },
    {
      title: t("action"),
      width: 120,
      render: (_, record) => (
        <Button
          type='link'
          onClick={() =>
            router.push(
              ROUTE_CONFIG.QUOTE_MANAGEMENT.DETAIL.replace(":id", record.id)
            )
          }
        >
          {t("edit")}
        </Button>
      ),
    },
  ];

  const handleTableChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      // setData([]);
    }
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button
          type='primary'
          onClick={() => router.push(ROUTE_CONFIG.QUOTE_MANAGEMENT.CREATE)}
        >
          {t("add_new_quote")}
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={MOCK_DATA}
        onChange={handleTableChange}
        rowKey='id'
      />
    </>
  );
};

export default QuoteTable;

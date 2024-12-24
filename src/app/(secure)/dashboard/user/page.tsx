"use client";
import React from "react";
import { Card, Tabs } from "antd";
import { useTranslations } from "next-intl";
import withAuth from "@/app/hoc/withAuth";
import { StyledUserDashboard } from "./user-dashboard.styles";
import UserProfile from "@/components/user/user-profile";
import Address from "@/components/address";
import PasswordChange from "@/components/password-change/password-change";
import { STORAGE_KEY } from "@/constants";

const UserDashboardPage = () => {
  const t = useTranslations();
  const typeUserStorage = localStorage.getItem(STORAGE_KEY.USER_TYPE);
  const typeUser = typeUserStorage?.split(",")?.[0];
  const listTab = [
    {
      label: t("personal_information"),
      key: "1",
      children: <UserProfile />,
      type: ["EPC_I", "EPC", "DISTRIBUTOR", "STRIDE", "STRIDE_I"],
    },
    {
      label: t("address"),
      key: "2",
      children: <Address />,
      type: ["EPC_I", "EPC"],
    },
    {
      label: t("change_password"),
      key: "3",
      children: <PasswordChange />,
      type: ["EPC_I", "EPC"],
    },
  ];

  const listTabShow = listTab.filter((item) =>
    item.type.includes(typeUser || "")
  );

  return (
    <StyledUserDashboard>
      <Card className='user-content'>
        <Tabs defaultActiveKey='1' items={listTabShow} />
      </Card>
    </StyledUserDashboard>
  );
};

export default withAuth(UserDashboardPage);

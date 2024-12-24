"use client";
import React from "react";
import { Layout, Avatar, Flex, Dropdown } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import strideLogoImage from "../../../public/assets/image/logo.png";
import { ROUTE_CONFIG } from "@/constants";

const Header = () => {
  const t = useTranslations();
  const items = [
    {
      key: "quoteList",
      label: (
        <Link href={ROUTE_CONFIG.QUOTE_MANAGEMENT.LIST}>{t("quote_list")}</Link>
      ),
    },
    {
      key: "logout",
      label: (
        <>
          <LogoutOutlined /> &nbsp; <Link href='/user/logout'>{t("exit")}</Link>
        </>
      ),
    },
  ];

  return (
    <Layout.Header>
      <Flex justify='space-between' align='center'>
        <Image src={strideLogoImage} alt='stride-logo' />
        <div>
          <Dropdown
            menu={{
              items,
              style: {
                marginTop: 10,
              },
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Avatar icon={<UserOutlined size={32} />} />
            </a>
          </Dropdown>
        </div>
      </Flex>
    </Layout.Header>
  );
};

export default Header;

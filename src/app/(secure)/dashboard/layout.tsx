import Title from "antd/es/typography/Title";
import { useTranslations } from "next-intl";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations();
  return (
    <>
      <div className='admin-head-title'>
        <Title level={1}>{t("user_info")}</Title>
      </div>
      {children}
    </>
  );
}

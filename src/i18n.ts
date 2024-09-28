import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "vn", // Ngôn ngữ mặc định nếu không tìm thấy ngôn ngữ người dùng
  supportedLngs: ["en", "vi"], // Các ngôn ngữ hỗ trợ
  interpolation: {
    escapeValue: false, // React đã có sẵn escape, không cần nữa
  },
  backend: {
    loadPath: "/locales/{{lng}}/{{ns}}.json", // Đường dẫn tới file dịch
  },
});

export default i18n;

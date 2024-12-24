import { Button, Form, FormProps, Input } from "antd";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { StylePasswordChange } from "./password-change.style";
import useMutationApi from "@/hooks/useMutationApi";

interface FieldType {
  password?: String;
  currentPassword?: String;
  reTypePassword?: String;
}

const PasswordChange = () => {
  const t = useTranslations();
  const [form] = Form.useForm();
  const { mutateAsync: mutateChangePassword } =
    useMutationApi("change-password");

  const onCheckMatchPass = (
    password: String = "",
    reTypePassword: String = ""
  ) => {
    if (password !== reTypePassword) {
      toast.error(t("password_confirm_wrong"));
      return false;
    }
    return true;
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const isValid = onCheckMatchPass(values.password, values.reTypePassword);

    if (isValid) {
      const body: FieldType = {
        password: values.password,
        currentPassword: values.currentPassword,
      };
      onChangePassword(body);
      form.resetFields();
    }
  };

  const onChangePassword = async (body: FieldType) => {
    const res: any = await mutateChangePassword(body);
    if (!res?.success) {
      // hard code for demo VN
      if (res?.message === "Current password is not correct")
        toast.error(t("password_wrong"));
      return false;
    }
    toast.success(t("password_changed_success"));
    return true;
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <StylePasswordChange>
      <h1 className='title'>{t("change_password")}</h1>
      <div className='formChangePass'>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            password: "",
            currentPassword: "",
            reTypePassword: "",
          }}
          layout='vertical'
        >
          <Form.Item
            className='InputView'
            label={<span className='titleInput'>{t("current_password")}</span>}
            name='currentPassword'
            rules={[
              { required: true, message: t("current_password_required") },
            ]}
          >
            <Input.Password className='inputText' />
          </Form.Item>
          <Form.Item
            className='InputView'
            label={<span className='titleInput'>{t("new_password")}</span>}
            name='password'
            rules={[
              { required: true, message: t("new_password_required") },
              {
                min: 8,
                message: t("password_must_more_8_character"),
              },
              {
                pattern:
                  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?\/~`\\|]).+$/,
                message: t("password_need_special_character"),
              },
            ]}
          >
            <Input.Password className='inputText' />
          </Form.Item>
          <Form.Item
            className='InputView'
            label={<span className='titleInput'>{t("new_pasword_again")}</span>}
            name='reTypePassword'
            rules={[
              { required: true, message: t("new_pasword_again_required") },
            ]}
          >
            <Input.Password className='inputText' />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Button
              type='primary'
              htmlType='submit'
              className='ButtonLogin'
              block
            >
              {t("confirm")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </StylePasswordChange>
  );
};

export default PasswordChange;

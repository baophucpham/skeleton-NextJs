import { Button, Checkbox, Flex, Form, Input, Spin } from "antd";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import useQueryApi from "@/hooks/useQueryApi";
import { isEmpty } from "@/utilities";
import useMutationApi from "@/hooks/useMutationApi";

interface BodyAddress {
  address: String;
  note: String;
  isDefault: boolean;
}

interface Props {
  addressId: number;
  onClose: () => void;
  onFinishFailed: (errorInfo: any) => void;
  onSubmitSuccess: () => void;
}

const AddressForm: React.FC<Props> = ({
  addressId,
  onClose,
  onFinishFailed,
  onSubmitSuccess,
}) => {
  const t = useTranslations();
  const isAddNew = !addressId;
  const { data: addressDetailResponse, isFetching } = useQueryApi(
    "address-detail/get",
    {
      pathVariables: { id: addressId },
      enabled: !!addressId,
    }
  );
  const addressDetail = addressDetailResponse?.data ?? {};

  const { mutateAsync: mutateCreateAddress } = useMutationApi(
    "address/create",
    {
      onSuccess: () => {
        toast.success(t("add_address_success"));
        onSubmitSuccess();
        onClose();
      },
      onError: () => {
        toast.error(t("error_try_again"));
      },
    }
  );

  const { mutateAsync: mutateUpdateAddress } = useMutationApi(
    "address/update",
    {
      onSuccess: () => {
        toast.success(t("change_success"));
        onSubmitSuccess();
        onClose();
      },
      onError: () => {
        toast.error(t("error_try_again"));
      },
    }
  );

  const onFinish = async (values: any) => {
    if (isAddNew) {
      const body: BodyAddress = {
        address: values.address,
        note: values.note,
        isDefault: values.isDefault,
      };
      await mutateCreateAddress(body);
      return;
    }

    await mutateUpdateAddress({ ...values, pathVariables: { id: addressId } });
  };

  if ((isFetching || isEmpty(addressDetail)) && !!addressId)
    return (
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <Spin size='large' />
      </div>
    );

  return (
    <Form
      name='loginForm'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout='vertical'
      initialValues={addressDetail}
    >
      <Form.Item
        className='InputView'
        label={<span className='titleInput'>{t("address")}</span>}
        name='address'
        rules={[{ required: true, message: t("address_required") }]}
      >
        <Input className='inputText' />
      </Form.Item>
      <Form.Item
        className='InputView'
        label={<span className='titleInput'>{t("note")}</span>}
        name='note'
      >
        <Input className='inputText' />
      </Form.Item>

      <div className='markDefault'>
        <Flex justify='space-between'>
          <div>{t("mark_default_address")}</div>
          <Form.Item name='isDefault' valuePropName='checked'>
            <Checkbox className='titleInput'>{t("mark_as_default")}</Checkbox>
          </Form.Item>
        </Flex>
      </div>

      <Flex justify='flex-end' className='dinhTest'>
        <Form.Item>
          <Button className='ButtonLogin' block onClick={onClose}>
            {t("cancel")}
          </Button>
        </Form.Item>

        <Form.Item style={{ marginLeft: "1rem" }}>
          <Button
            type='primary'
            htmlType='submit'
            className='ButtonLogin'
            block
          >
            {t("confirm")}
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default AddressForm;

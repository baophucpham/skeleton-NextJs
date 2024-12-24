import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Modal, Spin } from "antd";
import { useTranslations } from "next-intl";

import AddressItem from "./address-item";
import { StyleAddress } from "./address.style";
import useMutationApi from "@/hooks/useMutationApi";
import useQueryApi from "@/hooks/useQueryApi";
import AddressForm from "./address-form/address-from";

interface DataFetch {
  id: number;
  address: String;
  note: String;
  createdAt: String;
  updatedAt: String;
  isDefault: boolean;
}

interface BodyAddress {
  address: String;
  note: String;
  isDefault: boolean;
}

const Address = () => {
  const t = useTranslations();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalModifyOpen, setModalModifyOpen] = useState(false);
  const [dataSelect, setDataSelect] = useState<any>();
  const [addressId, setAddressId] = useState(0);

  const isAddNew = !addressId;

  const {
    data: addressListResponse,
    error,
    refetch: getAddressList,
    isFetching,
  } = useQueryApi("address-list/get");
  const addressList = addressListResponse?.data ?? [];

  const { mutateAsync: mutateUpdateAddress } = useMutationApi(
    "address/update",
    {
      onError: () => {
        toast.error(t("error_try_again"));
      },
    }
  );

  const { mutateAsync: mutateDeleteAddress } = useMutationApi(
    "address/delete",
    {
      onError: () => {
        toast.error(t("error_try_again"));
      },
    }
  );

  if (error) {
    toast.error(t("error_try_again"));
  }

  const onConfirmDel = async () => {
    const res: any = await mutateDeleteAddress({
      pathVariables: { id: dataSelect.id },
    });
    if (res?.success) {
      toast.success(t("delete_success"));
    }
    setModalOpen(false);
    getAddressList();
  };

  const onCancelDel = () => {
    setModalOpen(false);
  };

  const closeAddressModal = () => {
    setModalModifyOpen(false);
  };

  const openModalConfirm = (id: number) => {
    const res = addressList.find((item: any) => item.id === id);
    setDataSelect(res);
    setModalOpen(true);
  };

  const openModalModified = (type: String, id: number = 0) => {
    if (type === "modi") {
      setAddressId(id);
    } else {
      setAddressId(0);
    }
    setModalModifyOpen(true);
  };

  const onChangeDefault = async (event: any) => {
    const body = {
      isDefault: event.checked,
    };
    const res: any = await mutateUpdateAddress({
      pathVariables: { id: event.value },
      ...body,
    });
    if (res.success) {
      toast.success(t("update_success"));
    }
    getAddressList();
  };

  const onFinishFailed = (errorInfo: any): void => {
    console.log("Failed:", errorInfo);
  };

  return (
    <StyleAddress>
      <Modal
        title={t("address_delete_confirm")}
        centered
        open={modalOpen}
        onCancel={onCancelDel}
        footer={
          <FooterModal
            conFirmDel={onConfirmDel}
            onCancel={onCancelDel}
            type='del'
          />
        }
      >
        {dataSelect?.address}
      </Modal>
      <Modal
        title={isAddNew ? t("new_address") : t("address_detail")}
        centered
        open={modalModifyOpen}
        onCancel={closeAddressModal}
        width={700}
        footer={null}
        destroyOnClose
      >
        <AddressForm
          onClose={closeAddressModal}
          onFinishFailed={onFinishFailed}
          onSubmitSuccess={() => getAddressList()}
          addressId={addressId}
        />
      </Modal>

      <h1 className='title'>{t("address_list")}</h1>
      <div className='listAddress'>
        <div className='navListAddress'>
          <h2>{t("address")}:</h2>
          <Button
            type='primary'
            htmlType='submit'
            className='ButtonLogin'
            iconPosition='start'
            onClick={() => openModalModified("new")}
            icon={<PlusCircleOutlined />}
          >
            {t("add_new_address")}
          </Button>
        </div>
        {isFetching ? (
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <Spin size='large' />
          </div>
        ) : (
          addressList?.map((item: DataFetch) => (
            <AddressItem
              key={item.id}
              id={item.id}
              address={item.address}
              note={item.note}
              isDefault={item.isDefault}
              conFirmDelete={openModalConfirm}
              onChangeDefault={onChangeDefault}
              modifiedModal={openModalModified}
            />
          ))
        )}
      </div>
    </StyleAddress>
  );
};

const FooterModal: React.FC<any> = ({ conFirmDel, onCancel, type }) => {
  const t = useTranslations();

  return (
    <>
      <Button onClick={onCancel}>{t("cancel")}</Button>
      <Button
        color={type == "del" ? "danger" : "primary"}
        variant='solid'
        onClick={conFirmDel}
      >
        {type == "del" ? t("delete") : t("confirm")}
      </Button>
    </>
  );
};

export default Address;

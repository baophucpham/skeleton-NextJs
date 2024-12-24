import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { StyledAddressItem } from "./address-item.style";
import { Radio } from "antd";

const AddressItem: React.FC<any> = ({
  id,
  address,
  note,
  isDefault,
  conFirmDelete,
  onChangeDefault,
  modifiedModal
}) => {

    const onChangeRadio = (event: any)=>{
        onChangeDefault(event.target)
    }

  const onDelete = (id: number) => {
    conFirmDelete(id);
  };

  const onModify = (id: number) => {
    modifiedModal("modi",id)
  }

  return (
    <StyledAddressItem>
      <div className="itemAddress">
        <h3>{address}</h3>
        <p className="note">{note ? `${note}` : ""}</p>
      </div>
      <div className="iconFunc">
        <div className="icon">
          <div className="iconItem">
            <EditOutlined onClick={() => onModify(id)} />
          </div>
          <div className="iconItem" onClick={() => onDelete(id)}>
            <DeleteOutlined />
          </div>
        </div>
        <div className="btnRadio">
          <Radio onChange={(e) => onChangeRadio(e)} checked={isDefault} value={id} >
            {isDefault ? "Mặc định" : "Đánh dấu là mặc định"}
          </Radio>
        </div>
      </div>
    </StyledAddressItem>
  );
};

export default AddressItem;

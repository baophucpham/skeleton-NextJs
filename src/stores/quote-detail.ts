import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { WithDevtools } from "./store";

type WarehouseLocationSlice = {
  warehouseLocation: string;
  setWarehouseLocation: (param: string) => void;
};

const warehouseLocationSlice: WithDevtools<WarehouseLocationSlice> = (set) => ({
  warehouseLocation: "",
  setWarehouseLocation: (location: string) =>
    set(
      () => ({ warehouseLocation: location }),
      undefined,
      "set warehouse location"
    ),
});

type StatusSlice = {
  status: {
    isEditing: boolean;
  };
  setIsEditing: (param: boolean) => void;
};

const statusQuoteDetailSlice: WithDevtools<StatusSlice> = (set) => ({
  status: { isEditing: false },
  setIsEditing: (editing: boolean) =>
    set(
      ({ status }) => ({ status: { ...status, isEditing: editing } }),
      undefined,
      "set status quote"
    ),
});

const useQuoteDetailStore = create<WarehouseLocationSlice & StatusSlice>()(
  devtools(
    (...a) => ({
      ...warehouseLocationSlice(...a),
      ...statusQuoteDetailSlice(...a),
    }),
    { name: "Quote Detail" }
  )
);

export default useQuoteDetailStore;

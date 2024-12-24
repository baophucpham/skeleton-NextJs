import { QuoteStatus, SubmitType } from "./common";

export type QuoteMutationPayloadType = {
  warehouse: string;
  category: string;
  item: string;
  itemCapacity: number;
  priceTable: any[];
  note?: string;
  type?: SubmitType;
};

export type PriceQuantityTableItemType = {
  quantityFrom: number;
  quantityTo: number;
  unitPrice: number;
};

export type QuoteDetailType = {
  id: number;
  warehouse: number;
  category: number;
  item: number;
  itemCapacity: number;
  priceTable: PriceQuantityTableItemType[];
  note: string;
  distributorName: string;
  distributorEmail: string;
  distributorPhone: string;
  warehouseLocation: string;
  company: string;
  status: QuoteStatus;
};

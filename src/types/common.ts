export enum StatusStep {
  NEW = 0,
  PENDING_REVIEW = 1,
  APPROVED_REJECTED = 2,
  CANCELLED = 3,
}

export enum QuoteStatus {
  DRAFT = "raw",
  NEW = "new",
  PENDING_REVIEW = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
}

export enum SubmitType {
  SAVE = "raw",
  WAIT_FOR_APPROVAL = "pending",
  CANCEL = "cancelled",
}

export type OptionItemType = {
  label: string;
  value: string;
};

export type OptionsType = OptionItemType[];

import { StateCreator } from "zustand";

export type WithDevtools<S> = StateCreator<
  S,
  [["zustand/devtools", never]],
  [],
  S
>;

import React from "react";
import { Tabs, TabsProps } from "antd";
import HistoryTabContent from "./history";
import NoteTabContent from "./note";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "History",
    children: <HistoryTabContent />,
  },
  {
    key: "2",
    label: "Note",
    children: <NoteTabContent />,
  },
];

const HistoryNote = () => {
  return <Tabs defaultActiveKey='1' items={items} />;
};

export default HistoryNote;

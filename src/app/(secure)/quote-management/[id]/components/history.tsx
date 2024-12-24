import { Timeline } from "antd";
import React from "react";

const HistoryTabContent = () => {
  return (
    <Timeline
      items={[
        {
          children: "15/10/2024 - Create a services site",
        },
        {
          children: "15/10/2024 - Solve initial network problems",
        },
        {
          children: "15/10/2024 - Technical testing",
        },
        {
          children: "15/10/2024 - Network problems being solved",
        },
      ]}
    />
  );
};

export default HistoryTabContent;

import React from "react";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 84px - 98px)",
      }}
    >
      <Spin size='large' />
    </div>
  );
};

export default Loading;

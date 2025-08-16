"use client";

// import { Layout, Typography } from "antd";
import { ReactNode } from "react";

// const { Footer } = Layout;
// const { Text, Link } = Typography;

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <div className="overflow-y-auto">{children}</div>
      
    </div>
  );
};

export default layout;

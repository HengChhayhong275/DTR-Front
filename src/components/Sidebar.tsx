/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from "react";
import { BankOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useNavigate } from "react-router";
import { RiDashboard3Line } from "react-icons/ri";
import {
  GrDocumentConfig,
  GrDocumentDownload,
  GrDocumentUpload,
} from "react-icons/gr";
import { LuUserCog2 } from "react-icons/lu";
import { selectAuthUser } from "@/store/features/auth/authSlice";
import { useSelector } from "react-redux";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

type Props = {
  collapsed: boolean;
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
};

const Sidebar = ({ collapsed, current, setCurrent }: Props) => {
  const navigate = useNavigate();

  const currentUser = useSelector(selectAuthUser);

  const adminItems: MenuItem[] = [
    getItem(
      "Dashboard",
      "/dashboard",
      <RiDashboard3Line style={{ fontSize: "25px" }} />
    ),
    getItem(
      "Manager Users",
      "/users",
      <UsergroupAddOutlined style={{ fontSize: "25px" }} />
    ),
    getItem(
      "Manager Unit",
      "/units",
      <BankOutlined style={{ fontSize: "25px" }} />
    ),
    getItem(
      "Manager Roles",
      "/roles",
      <LuUserCog2 style={{ fontSize: "25px" }} />
    ),
    getItem(
      "Manager Document Type",
      "/document-type",
      <GrDocumentConfig style={{ fontSize: "25px" }} />
    ),
    getItem(
      "Draft Record",
      "/draft",
      <GrDocumentDownload style={{ fontSize: "25px" }} />,
      [
        getItem("Draft Self-Registered", "/draft/self-registered"),
        getItem("Draft Other Registered", "/draft/other-registered"),
      ]
    ),
    getItem(
      "Document Dispatch",
      "self-registeredother-registered",
      <GrDocumentUpload style={{ fontSize: "25px" }} />,
      [
        getItem("Self-Registered Record", "/self-registered"),
        getItem("Other-Registered Record", "/other-registered"),
      ]
    ),
    getItem(
      "Document Reception",
      "received-record",
      <GrDocumentDownload style={{ fontSize: "25px" }} />,
      [
        getItem("Received Record List", "/received-record"),
        getItem("Dropped-Off Record", "/received-record/dropped-off"),
        getItem("Accepeted Record", "/received-record/accepted"),
      ]
    ),
  ];

  const userItems: MenuItem[] = [
    getItem(
      "Dashboard",
      "/dashboard",
      <RiDashboard3Line style={{ fontSize: "25px" }} />
    ),
    getItem(
      "Document Dispatch",
      "",
      <GrDocumentUpload style={{ fontSize: "25px" }} />,
      [
        getItem("Self-Registered Record", "/self-registered"),
        getItem("Other-Registered Record", "/other-registered"),
      ]
    ),
    getItem(
      "Document Reception",
      "received-record",
      <GrDocumentDownload style={{ fontSize: "25px" }} />,
      [
        getItem("Received Record List", "/received-record"),
        getItem("Dropped-Off Record", "/received-record/dropped-off"),
        getItem("Accepeted Record", "/received-record/accepted"),
      ]
    ),
  ];


  return (
    <Sider
      className="!transition-all !duration-500"
      width={270}
      style={{
        overflow: "auto",
        height: "90vh",
        position: "fixed",
        left: 0,
      }}
      collapsed={collapsed}
      theme="light"
    >
      <Menu
        className="flex flex-col gap-y-4 font-semibold pb-8"
        theme="light"
        mode="inline"
        items={ currentUser?.role?.name === 'SUPER_ADMIN' ? adminItems : userItems}
        onClick={(item) => {
          navigate(item.key);
          setCurrent(item.key);
        }}
        selectedKeys={[current]}
      />
    </Sider>
  );
};

export default Sidebar;

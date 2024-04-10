import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import { ReactNode } from "react";

export const Accordion = ({
  children,
  title,
}: {
  children: ReactNode;
  title: String;
}) => {
  const panelStyle: React.CSSProperties = {
    background: "white",
    // borderRadius: "inherit",
    padding: 10,
  };

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
      ),
      children: <div>{children}</div>,
      // extra: <p>Show</p>,
      style: panelStyle,
    },
  ];

  return (
    <div>
      <Collapse 
        items={items} 
        defaultActiveKey={["1"]} 
        onChange={onChange} 
        bordered={false}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 180} />
        )}
        expandIconPosition="end"
      />
    </div>
  );
};

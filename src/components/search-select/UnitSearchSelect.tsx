import { Unit } from "@/@types";
import { Select, Space } from "antd";

export const UnitSearchSelect = ({
  title,
  childrens,
  setFieldValue,
}: {
  title: string;
  childrens?: Unit;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}) => {

  const selectOption = childrens?.map((type: Unit) => {
    return {
      value: type.id,
      label: type.name,
    };
  });

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Select
        className="h-[38px]"
        showSearch
        allowClear
        style={{ width: "100%" }}
        onChange={(value) => setFieldValue("requested_from", value)}
        placeholder={title}
        options={selectOption}
        filterOption={filterOption}
      />
    </Space>
  );
};

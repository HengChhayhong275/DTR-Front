import { Button, Tooltip } from "antd";
import { FaEye } from "react-icons/fa";

export const ViewButton = ({
  title,
  onClick,
}: {
  title?: string;
  onClick: () => void;
}) => {
  return (
    <Tooltip placement="top" title={"View"}>
      <Button
        type="primary"
        className="py-2 px-4 bg-custom-blue text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!bg-blue-600 hover:!text-white"
        onClick={onClick}
      >
        <FaEye />
        {title}
      </Button>
    </Tooltip>
  );
};

import { Button } from "antd";
import { FaPencilAlt } from "react-icons/fa";

export const CreateButton = ({
  title,
  onClick,
}: {
  title: string;
  onClick: () => void;
}) => {
  return (
    <Button
      type="primary"
      className="py-2 px-4 bg-green-500 text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!bg-green-400 hover:!text-white"
      onClick={onClick}
    >
      <FaPencilAlt />
      <span>{title}</span>
    </Button>
  );
};

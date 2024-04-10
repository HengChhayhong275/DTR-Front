import { Button } from "antd";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router";

export const GoBackArrow = ({ url }: { url: string }) => {
  const navigate = useNavigate();
  return (
    <Button
      type="primary"
      className="bg-custom-blue text-white rounded-lg flex gap-x-2 items-center text-base hover:!bg-blue-600 hover:!text-white h-[40px]"
      onClick={() => {
        navigate(`/${url}`);
      }}
    >
      <FaLongArrowAltLeft className="hover:cursor-pointer" size={25} />
      <p>Return</p>
    </Button>
  );
};

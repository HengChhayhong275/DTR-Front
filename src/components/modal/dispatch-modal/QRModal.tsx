import { Button, Divider, QRCode } from "antd";
import SuccessGif from "@/assets/images/Animation - 1710734210602.gif";
import { CloseOutlined } from "@ant-design/icons";

export const QRModal = ({
  pin,
  setOpen,
}: {
  pin: string;
  setOpen: (val: boolean) => void;
}) => {
  return (
    <div className="flex justify-center flex-col align-middle items-center gap-y-4">
      <button
        onClick={() => {
          setOpen(false);
        }}
        className="hover:bg-slate-100 p-2 rounded-full absolute right-4 top-4 border-none bg-white"
      >
        <CloseOutlined />
      </button>
      <img src={SuccessGif} width={50} />
      <div className="text-center flex flex-col align-middle justify-center items-center">
        <h1 className="text-xl font-semibold text-green-500">
          Document Dispatched Successfully!
        </h1>
        <p className="text-xs">
          Share this code to receiver to accept the document
        </p>
      </div>
      {pin && <QRCode size={200} value={pin.toString()} />}
      <Divider className="!my-0">4-Digit Code</Divider>
      <Button
        className="h-full"
        onClick={() => {
          navigator.clipboard.writeText(pin);
        }}
      >
        {pin}
      </Button>
    </div>
  );
};

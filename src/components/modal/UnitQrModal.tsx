import { Button, QRCode, Tooltip } from "antd";
import { BaseModal } from "./BaseModal";
import { FaRegCopy } from "react-icons/fa";

export const UnitQrModal = ({
  open,
  setOpen,
  pin,
  name
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  pin: string;
  name: string;
}) => {
  return (
    <BaseModal open={open} setOpen={setOpen}>
      <div className="flex justify-center flex-col align-middle items-center gap-y-2">
        <h1 className="text-xl font-semibold ">Unit's QR Code</h1>
        {pin && <QRCode size={150} value={pin.toString()} />}
        <p className=" font-bold">{name}</p>
        <Tooltip title={"Copy to clipboard"} placement="right">
          <Button
            className="h-full flex items-center gap-x-2"
            onClick={() => {
              navigator.clipboard.writeText(pin);
            }}
          >
            {pin}
            <FaRegCopy />
          </Button>
        </Tooltip>
      </div>
    </BaseModal>
  );
};

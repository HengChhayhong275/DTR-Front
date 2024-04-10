import { Button, QRCode } from "antd";
import { FormatDateTime } from "../functions/FormatDateTime";
import { SelfRegisteredRecord } from "@/@types/self-registered-record";
import { DropOffModal } from "../modal/dispatch-modal/DropOffModal";
import { useState } from "react";
import { OtherRegisteredRecord } from "@/@types";
import { useLocation } from "react-router";

export const QRInfo = ({
  record,
  setOpen,
}: {
  record: SelfRegisteredRecord | OtherRegisteredRecord;
  setOpen?: (val: boolean) => void;
}) => {
  const [dropOffModal, setDropOffModal] = useState(false);
  const location = useLocation();

  return (
    <>
      <div className="flex gap-x-8 flex-col">
        <div className="w-full flex justify-between mb-4">
          <h2 className="text-lg font-semibold">QR Info</h2>
          <div className="flex gap-x-4">
            {(location.pathname === "/self-registered" || location.pathname === "/other-registered") && (
                <Button
                  onClick={() => {
                    if (setOpen) {
                      setOpen(false);
                    }
                    setDropOffModal(true);
                  }}
                  className=" hover:!border-custom-blue hover:!text-custom-blue bg-custom-blue text-white"
                >
                  Drop Off
                </Button>
              )}
          </div>
        </div>
        <div className="flex gap-x-8">
          <QRCode size={150} value={record?.transaction?.pin.toString()} />
          <div className="flex gap-x-2">
            <div>
              <p>Pin</p>
              <p>Dispatched By</p>
              <p>Dispatched Date</p>
            </div>
            <div>
              <p>: {record?.transaction?.pin}</p>
              <p>
                : {record?.transaction?.sender?.firstNameEn}{" "}
                {record?.transaction?.sender?.lastNameEn}
              </p>
              <p>
                : {FormatDateTime(record?.transaction?.createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <DropOffModal
        record={record}
        setOpen={setDropOffModal}
        open={dropOffModal}
      />
    </>
  );
};

import { Divider, Modal } from "antd";
import { SelfRegisteredRecord } from "@/@types/self-registered-record";
import { QRInfo } from "@/components/document/QRInfo";
import { ReceiverInfo } from "@/components/document/ReceiverInfo";
import DropOffInfo from "@/components/document/DropOffInfo";
import { TransactionStatusInfo } from "@/components/document/TransactionStatusInfo";
import { OtherRegisteredRecord } from "@/@types";

export const DispatchStatusModal = ({
  open,
  setOpen,
  record,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  record: SelfRegisteredRecord | OtherRegisteredRecord | undefined;
}) => {
  return (
    <Modal
      width={750}
      centered
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      footer={() => <></>}
    >
      <div className="min-h-[75px] flex flex-col gap-y-4">
        <h1 className="text-lg font-bold">Document Status</h1>
        <div className="place-content-center min-w-[700px] grid grid-cols-5">
          <div>
            <p className="font-semibold">Document ID</p>
            <p>{record?.documentOriginInfo?.doc_given_number}</p>
          </div>
          <div>
            <p className="font-semibold">Summary</p>
            <p>{record?.documentOriginInfo?.summary}</p>
          </div>
          <div>
            <p className="font-semibold">Transaction Status</p>
            <TransactionStatusInfo record={record} />
          </div>
          <div>
            <p className="font-semibold">Published Date</p>
            <p>{record?.documentOriginInfo?.published_date.toString()}</p>
          </div>
          {record?.transaction?.transaction_status?.accepted && (
            <div>
              <p className="font-semibold">Received by</p>
              <p>{record?.transaction?.receiver?.unit?.name}</p>
            </div>
          )}
        </div>
        <div>
          <Divider className="!my-4" />
          {record?.transaction?.transaction_status?.accepted ? (
            <ReceiverInfo record={record} />
          ) : (
            <>
              {record?.transaction?.method === "DROP_OFF" && (
                <>
                <DropOffInfo record={record} />
                </>
              )}
              {record?.transaction?.method === "QR_CODE" && (
                <QRInfo setOpen={setOpen} record={record} />
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

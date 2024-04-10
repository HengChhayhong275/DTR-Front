/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useEffect, useState } from "react";
import { QRModal } from "./QRModal";
import { Button, Modal } from "antd";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { useDispatchSelfMutation } from "@/store/features/document/selfRegisteredRecordApiSlice";
import { useSelector } from "react-redux";
import { selectAuthUser } from "@/store/features/auth/authSlice";
import { OtherRegisteredRecord, SelfRegisteredRecord } from "@/@types";
import { useDispatchOtherMutation } from "@/store/features/document/otherRegisteredRecordApiSlice";

export const DispatchModal = ({
  open,
  setOpen,
  record,
  type,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  record: SelfRegisteredRecord | OtherRegisteredRecord | undefined;
  type: string;
}) => {
  const currentUser = useSelector(selectAuthUser);

  const [isSuccess, setIsSuccess] = useState(false);
  const [pin, setPin] = useState<string>("");

  useEffect(() => {
    setIsSuccess(false);
  }, [setOpen, open]);

  const [dispatchSelf] = useDispatchSelfMutation();
  const [dispatchOther] = useDispatchOtherMutation();

  const [isLoading, setIsLoading] = useState(false);

  const handleDispatch = async (id: string | undefined) => {
    try {
      setIsLoading(true);
      const values = {
        sender: currentUser?.id,
        record: id,
      };
      if (type === "Self") {
        await dispatchSelf(values)
          .unwrap()
          .then((res) => {
            setPin(String(res?.pin));
          });
      } else {
        await dispatchOther(values)
          .unwrap()
          .then((res) => {
            setPin(String(res?.pin));
          });
      }

      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      closeIcon={false}
      centered
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      footer={() => <></>}
    >
      {isSuccess && pin ? (
        <QRModal pin={pin} setOpen={setOpen} />
      ) : (
        <div className="flex flex-col gap-y-4">
          <div className="bg-gray-700 py-8 w-full text-white">
            <h1 className="text-xl text-center">Dispatch Confirmation</h1>
          </div>
          <div>
            <h2 className="mb-2 my-0 text-lg">
              Please confirm the document that you want to dispatch
            </h2>
            <div className="flex gap-x-2">
              <div className="font-bold">
                <p>Document ID</p>
                <p>Summary</p>
                <p>Document Type</p>
                <p>Publish Date</p>
              </div>
              <div>
                <p>: {record?.documentOriginInfo?.doc_given_number}</p>
                <p>: {record?.documentOriginInfo?.summary}</p>
                <p>: {record?.documentOriginInfo?.documentType.name}</p>
                <p>: {String(record?.documentOriginInfo?.published_date)}</p>
              </div>
            </div>
          </div>
          <div className="gap-x-4 flex justify-end">
            <Button
              className="py-2 px-4 text-white rounded-lg flex gap-x-2 items-center text-base h-full bg-red-600 hover:!text-red-600 hover:!border-red-600"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              className="py-2 px-4 bg-green-500 text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!border-green-400 hover:!text-green-400 break-all"
              onClick={() => {
                handleDispatch(record?.id);
              }}
            >
              {isLoading && <LoadingSpinner color="black" />}
              Confirm
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

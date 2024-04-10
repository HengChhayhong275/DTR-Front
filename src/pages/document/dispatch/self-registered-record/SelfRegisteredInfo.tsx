import { Navigate, useNavigate, useParams } from "react-router";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Button, Divider, Modal } from "antd";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { GoBackArrow } from "@/components/button/GoBackArrow";
import {
  useDeleteSelfRegisteredRecordMutation,
  useGetSelfRegisteredRecordQuery,
} from "@/store/features/document/selfRegisteredRecordApiSlice";
import { FormatDateTime } from "@/components/functions/FormatDateTime";
import { TransactionStatusInfo } from "@/components/document/TransactionStatusInfo";
import { ReceiverInfo } from "@/components/document/ReceiverInfo";
import DropOffInfo from "@/components/document/DropOffInfo";
import { RecordStatusInfo } from "@/components/document/RecordStatusInfo";
import { useState } from "react";
import { SelfRegisteredRecord } from "@/@types";
import { DispatchModal } from "@/components/modal/dispatch-modal/DispatchModal";
import { QRInfo } from "@/components/document/QRInfo";

export const SelfRegisteredInfo = () => {
  const { id } = useParams();

  const { data: documentSelfRecord, isLoading: fetchLoading } =
    useGetSelfRegisteredRecordQuery(id);
  const [deleteDocumentSelfRecord, { isLoading }] =
    useDeleteSelfRegisteredRecordMutation();

  const navigate = useNavigate();

  const [openDispatch, setOpenDispatch] = useState(false);

  const [selectedRecord, setSelectedRecord] = useState<SelfRegisteredRecord>();

  const handleDeleteDocumentSelfRecord = async (id: string | undefined) => {
    try {
      await deleteDocumentSelfRecord(id).unwrap();
      navigate("/self-registered");
    } catch (error) {
      console.log(error);
    }
  };

  if (fetchLoading) {
    return <LoadingSpinner color="black" />;
  }

  if (!documentSelfRecord && !fetchLoading) {
    return <Navigate to={"/self-registered"} />;
  }

  const created_by =
    documentSelfRecord?.documentOriginInfo?.created_by?.firstNameEn +
    " " +
    documentSelfRecord?.documentOriginInfo?.created_by?.lastNameEn;

  return (
    <div className="bg-white p-8 w-full flex flex-col gap-y-8">
      <div className="flex justify-between">
        <GoBackArrow url="self-registered" />
        <div className="flex gap-x-4">
          {documentSelfRecord?.record_status?.draft && (
            <Button
              type="primary"
              className="bg-custom-blue text-white rounded-lg flex gap-x-2 items-center text-base hover:!bg-blue-600 hover:!text-white h-[40px]"
              onClick={() => {
                setSelectedRecord(documentSelfRecord);
                setOpenDispatch(true);
              }}
            >
              Dispatch
            </Button>
          )}

          <Button
            className="py-2 px-4 bg-green-500 text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!border-green-400 hover:!text-green-400"
            onClick={() => {
              navigate(`/self-registered/${documentSelfRecord?.id}/edit`);
            }}
          >
            <FaPencilAlt />
            Edit
          </Button>
          <Button
            className="py-2 px-4 text-white rounded-lg flex gap-x-2 items-center text-base h-full bg-red-600 hover:!text-red-600 hover:!border-red-600"
            onClick={() => {
              Modal.confirm({
                title: "Are you sure you want to delete this Document Record?",
                content: `${documentSelfRecord?.documentOriginInfo?.doc_given_number} ${documentSelfRecord?.documentOriginInfo?.summary}`,
                centered: true,
                footer: () => (
                  <>
                    <Button
                      className="bg-red-600 hover:!text-red-600 hover:!border-red-600 text-white"
                      onClick={() => {
                        Modal.destroyAll();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-green-500 hover:!text-green-400 hover:!border-green-400 text-white"
                      onClick={() => {
                        handleDeleteDocumentSelfRecord(id);
                        Modal.destroyAll();
                      }}
                    >
                      Sure
                    </Button>
                  </>
                ),
              });
            }}
          >
            {isLoading ? <LoadingSpinner color="white" /> : <FaTrashAlt />}
            Remove
          </Button>
        </div>
      </div>
      <div className="flex gap-y-2 flex-col">
        <h1 className=" text-2xl">Self Registered Info</h1>
        <div className="flex gap-x-2 items-center">
          <p className="font-bold text-base">Record Status:</p>
          <RecordStatusInfo record={documentSelfRecord} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-y-4 text-sm font-normal text-black">
        <div>
          <p className="text-black font-semibold text-base  mb-1">
            Document ID:
          </p>
          <p className=" text-base">
            {documentSelfRecord?.documentOriginInfo?.doc_given_number}
          </p>
        </div>
        <div>
          <p className="text-black font-semibold text-base  mb-1">Summary:</p>
          <p className=" text-base">
            {documentSelfRecord?.documentOriginInfo?.summary}
          </p>
        </div>
        <div>
          <p className="text-black font-semibold text-base  mb-1">
            Document Type:
          </p>
          <p className=" text-base">
            {documentSelfRecord?.documentOriginInfo?.documentType?.name}
          </p>
        </div>
        <div>
          <p className="text-black font-semibold text-base  mb-1">Remark:</p>
          <p className=" text-base">
            {documentSelfRecord?.documentOriginInfo?.other}
          </p>
        </div>
        <div>
          <p className="text-black font-semibold text-base  mb-1">Amount:</p>
          <p className=" text-base">
            {documentSelfRecord?.documentOriginInfo?.num_of_copies}
          </p>
        </div>
        <div>
          <p className="text-black font-semibold text-base  mb-1">
            Transaction Status
          </p>
          <TransactionStatusInfo record={documentSelfRecord} />
        </div>
        <div>
          <p className="text-black font-semibold text-base  mb-1">
            Created By:
          </p>
          <p className=" text-base">{created_by}</p>
        </div>
        <div>
          <p className="text-black font-semibold text-base  mb-1">
            Registered Date:
          </p>
          <p>
            {FormatDateTime(documentSelfRecord?.documentOriginInfo?.createdAt)}
          </p>
        </div>
        <div>
          <p className="text-black font-semibold text-base  mb-1">
            Published Date:
          </p>
          <p className=" text-base">
            {documentSelfRecord?.documentOriginInfo?.published_date}
          </p>
        </div>
        <div>
          <p className="text-black font-semibold text-base  mb-1">
            Document File:
          </p>
          <p className="underline text-custom-blue">Example.pdf</p>
        </div>
        <div>
          <p className="text-black font-semibold text-base  mb-1">
            Refferal File:
          </p>
          <p className="underline text-custom-blue">Example.pdf</p>
        </div>
      </div>
      {!documentSelfRecord?.record_status?.draft && (
        <>
          <Divider className="!my-0" />
          <div className="flex flex-col gap-y-4">
            <h2 className="my-0">Document Dispatched Info</h2>
            {documentSelfRecord?.transaction?.transaction_status?.accepted && (
              <ReceiverInfo record={documentSelfRecord} />
            )}
            {documentSelfRecord?.transaction?.transaction_status?.pending && (
              <>
                {documentSelfRecord?.transaction?.method === "DROP_OFF" && (
                  <DropOffInfo record={documentSelfRecord} />
                )}
                {documentSelfRecord?.transaction?.method === "QR_CODE" && (
                  <QRInfo record={documentSelfRecord} />
                )}
              </>
            )}
          </div>
        </>
      )}
      <DispatchModal
        setOpen={setOpenDispatch}
        open={openDispatch}
        record={selectedRecord}
        type="Self"
      />
    </div>
  );
};

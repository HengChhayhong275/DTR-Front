/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoBackArrow } from "@/components/button/GoBackArrow";
import { FormatDateTime } from "@/components/functions/FormatDateTime";
import { AcceptIdModal } from "@/components/modal/accept-modal/AcceptIdModal";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { ToastError } from "@/components/toast/ToastError";
import { ToastSucess } from "@/components/toast/ToastSucess";
import { useRejectRequestMutation } from "@/store/features/document/handleRequestApiSlice";
import {
  useDeleteDraftSelfRecordMutation,
  useGetDraftSelfRecordQuery,
  useSaveToSelfRegisteredRecordMutation,
} from "@/store/features/draft/draftRecordApiSlice";
import { Button, Modal } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import PreviewFile from "@/assets/images/file.png";
import { useGetDocGivenNumberQuery } from "@/store/features/document/selfRegisteredRecordApiSlice";

const DraftSelfRegisteredRecordInfo = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: documentGivenNumber } = useGetDocGivenNumberQuery(undefined);

  const { data: draftSelfRecord } = useGetDraftSelfRecordQuery(id);
  const [deleteDraftSelfRegisteredRecord, { isLoading }] =
    useDeleteDraftSelfRecordMutation();

  const handleDeleteDraftSelfRegisteredRecord = async (
    id: string | undefined
  ) => {
    try {
      await deleteDraftSelfRegisteredRecord(id).unwrap();
      ToastSucess("Delete Draft Self Registered Record Successfully !");
      navigate("/draft/self-registered");
    } catch (err: any) {
      console.log(err);
      ToastError(err?.data?.message);
    }
  };

  const [saveToSelfRegisteredRecord] = useSaveToSelfRegisteredRecordMutation();
  const handleSaveToSelfRegisteredRecord = async (id: string | undefined) => {
    try {
      await saveToSelfRegisteredRecord(id).unwrap();
      ToastSucess(
        "Save Draft Self Registered Record to Self Registered Record Successfully !"
      );
      navigate("/self-registered");
    } catch (err: any) {
      console.log(err);
      ToastError(err?.data?.message);
    }
  };

  const [rejectRequest] = useRejectRequestMutation();
  const handleRejectRequest = async (id: string | undefined) => {
    try {
      await rejectRequest(id).unwrap();
      ToastSucess("Document ID Request Rejected !");
      navigate("/draft/self-registered");
    } catch (err: any) {
      console.log(err);
      ToastError(err?.data?.message);
    }
  };

  // Full name of creator
  const created_by =
    draftSelfRecord?.documentOriginInfo?.created_by?.firstNameEn +
    " " +
    draftSelfRecord?.documentOriginInfo?.created_by?.lastNameEn;

  // Check Draft or Request, true = draft, false = request
  const isTransaction: boolean =
    draftSelfRecord?.request_transaction === null ? true : false;

  return (
    <section>
      {isTransaction == true ? (
        <div className="bg-white p-8 w-full flex flex-col gap-y-8">
          <div className="flex justify-between">
            <GoBackArrow url="self-registered" />

            <div className="flex gap-x-4">
              <Button
                className="py-2 px-4 bg-green-500 text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!border-green-500 hover:!text-green-500"
                onClick={() => {
                  handleSaveToSelfRegisteredRecord(id);
                }}
              >
                <FaPencilAlt />
                Save to Record
              </Button>

              <Button
                className="py-2 px-4 bg-green-500 text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!border-green-500 hover:!text-green-500"
                onClick={() => {
                  navigate(
                    `self-registered/create/draft/self/${draftSelfRecord?.id}/edit`
                  );
                }}
              >
                <FaPencilAlt />
                Edit
              </Button>

              <Button
                className="py-2 px-4 text-white rounded-lg flex gap-x-2 items-center text-base h-full bg-red-600 hover:!text-red-600 hover:!border-red-600"
                onClick={() => {
                  Modal.confirm({
                    title:
                      "Are you sure you want to delete this Document Record?",
                    content: `${draftSelfRecord?.documentOriginInfo?.doc_given_number} ${draftSelfRecord?.documentOriginInfo?.summary}`,
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
                          className="bg-green-500 hover:!text-green-500 hover:!border-green-500 text-white"
                          onClick={() => {
                            handleDeleteDraftSelfRegisteredRecord(id);
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

          <h1 className="text-2xl font-semibold">Draft Self Registered Info</h1>
          <div className="grid grid-cols-3 gap-y-4 text-sm font-normal text-black">
            <div>
              <p className="text-slate-600 font-bold">Created By:</p>
              <p>{created_by}</p>
            </div>
            <div>
              <p className="text-slate-600 font-bold">Registered Date:</p>
              <p>
                {FormatDateTime(draftSelfRecord?.documentOriginInfo?.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-slate-600 font-bold">Document ID:</p>
              <p>{draftSelfRecord?.documentOriginInfo?.doc_given_number}</p>
            </div>
            <div>
              <p className="text-slate-600 font-bold">Document Type:</p>
              <p>{draftSelfRecord?.documentOriginInfo?.documentType?.name}</p>
            </div>
            <div>
              <p className="text-slate-600 font-bold">Summary:</p>
              <p>{draftSelfRecord?.documentOriginInfo?.summary}</p>
            </div>
            <div>
              <p className="text-slate-600 font-bold">Published Date:</p>
              <p>{draftSelfRecord?.documentOriginInfo?.published_date}</p>
            </div>
            <div>
              <p className="text-slate-600 font-bold">Amount:</p>
              <p>{draftSelfRecord?.documentOriginInfo?.num_of_copies}</p>
            </div>
            <div>
              <p className="text-slate-600 font-bold">Other:</p>
              <p>{draftSelfRecord?.documentOriginInfo?.other}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="border border-gray-300 mr-20 rounded-md">
              <div>
                <p className="text-slate-600 font-bold">Document File:</p>
                <div>
                  <img src={PreviewFile} alt="Preview File" />
                </div>
              </div>
            </div>
            <div className="border border-gray-300 mr-20 rounded-md">
              <div>
                <p className="text-slate-600 font-bold">Refferal File:</p>
                <div>
                  <img
                    src={PreviewFile}
                    alt="Preview File"
                    className="w-[10%] h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 w-full flex flex-col gap-y-8">
          {/* Button */}
          <div className="flex justify-between">
            <GoBackArrow url="self-registered" />

            <div className="flex gap-x-4">
              <Button
                className="py-2 px-4 bg-green-500 text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!border-green-500 hover:!text-green-500"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <FaPencilAlt />
                Accept
              </Button>
              <AcceptIdModal open={open} setOpen={setOpen} id={id} />

              <Button
                className="py-2 px-4 text-white rounded-lg flex gap-x-2 items-center text-base h-full bg-red-600 hover:!text-red-600 hover:!border-red-600"
                onClick={() => {
                  Modal.confirm({
                    title: "Are you sure you want to reject this request?",
                    content: `Requested By: ${draftSelfRecord?.request_transaction?.requested_by?.name}`,
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
                          className="bg-green-500 hover:!text-green-500 hover:!border-green-500 text-white"
                          onClick={() => {
                            handleRejectRequest(id);
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
                Reject
              </Button>
            </div>
          </div>

          <h1 className="text-2xl font-semibold">
            Request Self Registered Info
          </h1>

          <div>
            <p className="text-slate-600 font-bold text-lg">
              Requesting for ID:
              <span className="text-red-500 ml-2">{documentGivenNumber?.doc_given_number}</span>
            </p>
          </div>

          <div className="grid grid-cols-3 gap-y-4 text-sm font-normal text-black">
            <div>
              <p className="text-slate-600 font-bold">Created By:</p>
              <p>{created_by}</p>
            </div>
            <div>
              <p className="text-slate-600 font-bold">Requested By:</p>
              <p className="text-red-500">
                {draftSelfRecord?.request_transaction?.requested_by?.name}
              </p>
            </div>
            <div>
              <p className="text-slate-600 font-bold">Registered Date:</p>
              <p>
                {FormatDateTime(draftSelfRecord?.documentOriginInfo?.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-slate-600 font-bold">Document Type:</p>
              <p>{draftSelfRecord?.documentOriginInfo?.documentType?.name}</p>
            </div>
            <div>
              <p className="text-slate-600 font-bold">Summary:</p>
              <p>{draftSelfRecord?.documentOriginInfo?.summary}</p>
            </div>
            <div>
              <p className="text-slate-600 font-bold">Published Date:</p>
              <p>{draftSelfRecord?.documentOriginInfo?.published_date}</p>
            </div>
            <div>
              <p className="text-slate-600 font-bold">Amount:</p>
              <p>{draftSelfRecord?.documentOriginInfo?.num_of_copies}</p>
            </div>
            <div>
              <p className="text-slate-600 font-bold">Other:</p>
              <p>{draftSelfRecord?.documentOriginInfo?.other}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <div className="border border-gray-300 mr-20 rounded-md">
              <div>
                <p className="text-slate-600 font-bold">Document File:</p>
                <div>
                  <img
                    src={PreviewFile}
                    alt="Preview File"
                    className="w-[10%] h-auto"
                  />
                </div>
              </div>
            </div>
            <div className="border border-gray-300 mr-20 rounded-md">
              <div>
                <p className="text-slate-600 font-bold">Refferal File:</p>
                <div>
                  <img
                    src={PreviewFile}
                    alt="Preview File"
                    className="w-[10%] h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DraftSelfRegisteredRecordInfo;

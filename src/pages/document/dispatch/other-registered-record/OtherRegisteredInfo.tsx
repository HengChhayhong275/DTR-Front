import { GoBackArrow } from "@/components/button/GoBackArrow";
import { FormatDateTime } from "@/components/functions/FormatDateTime";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { useGetOtherRegisteredRecordQuery } from "@/store/features/document/otherRegisteredRecordApiSlice";
import { Button, Modal } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Navigate, useNavigate, useParams } from "react-router";
import PreviewFile from "@/assets/images/file.png";

export const OtherRegisteredInfo = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: otherRegisteredRecord, isLoading: fetchLoading } =
    useGetOtherRegisteredRecordQuery(id);

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteDocumentSelfRecord = (id: string | undefined) => {
    setIsLoading(true);
    console.log(id);
    setIsLoading(false);
  };

  const created_by =
    otherRegisteredRecord?.documentOriginInfo?.created_by?.firstNameEn +
    " " +
    otherRegisteredRecord?.documentOriginInfo?.created_by?.lastNameEn;

  if (fetchLoading) {
    return <LoadingSpinner color="black" />;
  }

  if (!otherRegisteredRecord && !fetchLoading) {
    return <Navigate to={"/other-registered"} />;
  }

  return (
    <div className="bg-white p-8 w-full flex flex-col gap-y-8">
      <div className="flex justify-between">
        <GoBackArrow url="other-registered" />
        <div className="flex gap-x-4">
          <Button
            className="py-2 px-4 bg-green-500 text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!border-green-400 hover:!text-green-400"
            onClick={() => {
              navigate(`/self-registered/${otherRegisteredRecord?.id}/edit`);
            }}
          >
            <FaPencilAlt />
            Edit
          </Button>

          <Button
            className="py-2 px-4 text-white rounded-lg flex gap-x-2 items-center text-base h-full bg-red-600 hover:!text-red-600 hover:!border-red-600"
            onClick={() => {
              Modal.confirm({
                title: "Are you sure you want to delete this record?",
                content: `${otherRegisteredRecord?.documentOriginInfo?.doc_given_number} ${otherRegisteredRecord?.documentOriginInfo?.summary}`,
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
      {/* <ToastContainer/> */}
      <h1 className=" text-3xl">Other Registered Record Info</h1>
      {/* <img src={User} className="max-w-[200px]" /> */}
      <div className="grid grid-cols-3 gap-y-4 text-sm font-normal text-black">
        <div>
          <p className="text-slate-600 text-base  mb-1">Created By:</p>
          <p className=" text-base">{created_by}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base  mb-1">Registered Date:</p>
          <p>
            {FormatDateTime(
              otherRegisteredRecord?.documentOriginInfo?.createdAt
            )}
          </p>
        </div>
        <div>
          <p className="text-slate-600 text-base  mb-1">Document ID:</p>
          <p className=" text-base">
            {otherRegisteredRecord?.documentOriginInfo?.doc_given_number}
          </p>
        </div>
        <div>
          <p className="text-slate-600 text-base  mb-1">Document Type:</p>
          <p className=" text-base">
            {otherRegisteredRecord?.documentOriginInfo?.documentType?.name}
          </p>
        </div>
        <div>
          <p className="text-slate-600 text-base  mb-1">Summary:</p>
          <p className=" text-base">
            {otherRegisteredRecord?.documentOriginInfo?.summary}
          </p>
        </div>
        <div>
          <p className="text-slate-600 text-base  mb-1">Published Date:</p>
          <p className=" text-base">
            {otherRegisteredRecord?.documentOriginInfo?.published_date.toString()}
          </p>
        </div>
        <div>
          <p className="text-slate-600 text-base  mb-1">Amount:</p>
          <p className=" text-base">
            {otherRegisteredRecord?.documentOriginInfo?.num_of_copies}
          </p>
        </div>
        <div>
          <p className="text-slate-600 text-base  mb-1">Other:</p>
          <p className=" text-base">
            {otherRegisteredRecord?.documentOriginInfo?.other}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div>
          <p className="text-slate-600 text-base  mb-1">Document File:</p>
          <div className="flex items-center gap-4">
            <img
              src={PreviewFile}
              alt="Preview File"
              className="w-[10%] h-auto"
            />
            <p>Filename.png</p>
          </div>
        </div>
        <div>
          <p className="text-slate-600 text-base  mb-1">Refferal File:</p>
          <div className="flex items-center gap-4">
            <img
              src={PreviewFile}
              alt="Preview File"
              className="w-[10%] h-auto"
            />
            <p>Filename.png</p>
          </div>
        </div>
      </div>
    </div>
  );
};

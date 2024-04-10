import { AcceptDocumentModal } from "@/components/modal/accept-modal/AcceptDocumentModal";
import { Button } from "antd";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { AcceptingRecordList } from "../../../components/document/accepting-record/AcceptingRecordList";

export const AccpetingRecord = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col w-full gap-y-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold">Accepted Record List</h1>
      <Button
        className="bg-green-500 hover:!text-green-500 hover:!border-green-500 text-white max-w-[200px]"
        onClick={() => {
          setOpen(true);
        }}
      >
        Receive Document
      </Button>
      <AcceptingRecordList />
      <AcceptDocumentModal open={open} setOpen={setOpen} />
    </div>
  );
};

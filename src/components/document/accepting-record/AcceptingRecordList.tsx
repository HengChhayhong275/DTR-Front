import { AcceptingRecord } from "@/@types/accepting-record";
import { SaveToReceiveRecordModal } from "@/components/modal/receive-modal/SaveToReceiveRecordModal";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { useGetAcceptingRecordsQuery } from "@/store/features/document/acceptingRecordApiSlice";
import { Button, Empty } from "antd";
import { useState } from "react";

export const AcceptingRecordList = () => {
  const { data: acceptingRecords, isLoading: getDataLoading } =
    useGetAcceptingRecordsQuery(undefined);

  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AcceptingRecord>();

  if (getDataLoading) {
    <LoadingSpinner color="black" />;
  }

  if (acceptingRecords?.length === 0) {
    return(
      <div className="h-[400px] flex justify-center items-center">
        <Empty />
      </div>
    ) ;
  }

  return (
    <div className="relative overflow-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3">
              No
            </th>
            <th scope="col" className="px-4 py-3">
              Document ID
            </th>
            <th scope="col" className="px-4 py-3">
              Summary
            </th>
            <th scope="col" className="px-4 py-3">
              Created by
            </th>
            <th scope="col" className="px-4 py-3">
              Received By
            </th>

            <th scope="col" className=" px-6 py-3 text-start w-[200px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {acceptingRecords?.map((record: AcceptingRecord, index: number) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {(index += 1)}
              </th>
              <th
                scope="row"
                className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {record?.documentOriginInfo?.doc_given_number}
              </th>
              <th
                scope="row"
                className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {record?.documentOriginInfo?.summary}
              </th>
              <th
                scope="row"
                className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {record?.documentOriginInfo?.created_by?.unit?.name}
              </th>
              <th
                scope="row"
                className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {record?.receiver?.firstNameEn} {record?.receiver?.lastNameEn}
              </th>
              <td className="px-4 py-4 text-gray-900">
                <Button
                  className="bg-custom-blue hover:!text-custom-blue hover:!border-custom-blue text-white max-w-[200px]"
                  onClick={() => {
                    setSelectedRecord(record);
                    setOpen(true);
                  }}
                >
                  Save
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <SaveToReceiveRecordModal
        open={open}
        setOpen={setOpen}
        record={selectedRecord}
      />
    </div>
  );
};

import { FormatDateTime } from "@/components/functions/FormatDateTime";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { Empty } from "antd";

import { ToastContainer } from "react-toastify";
import { useGetReceivedRecordsQuery } from "@/store/features/document/receiveRecordApiSlice";
import { ReceivedRecord } from "@/@types";

export const ReceivedRecordList = () => {
  const { data: receivedRecords, isLoading: fetchReceivedLoading } =
    useGetReceivedRecordsQuery(undefined);

  if (fetchReceivedLoading) {
    <LoadingSpinner color="black" />;
  }

  if (receivedRecords?.length === 0) {
    return(
      <div className="h-[400px] flex justify-center items-center">
        <Empty />
      </div>
    ) ;
  }

  return (
    <div className="relative overflow-auto">
      <ToastContainer />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 ">
              No
            </th>
            <th scope="col" className="px-4 py-3 ">
              Document ID
            </th>
            <th scope="col" className="px-4 py-3 ">
              Document Type
            </th>
            <th scope="col" className="px-4 py-3 ">
              Summary
            </th>
            <th scope="col" className="px-4 py-3 ">
              Registered Date
            </th>
            <th scope="col" className="px-4 py-3 ">
              Created By
            </th>
            <th scope="col" className=" px-4 py-3">
              Receiver
            </th>
            <th scope="col" className=" px-4 py-3">
              Other
            </th>
          </tr>
        </thead>
        <tbody>
          {receivedRecords?.map(
            (receivedRecord: ReceivedRecord, index: number) => (
              <tr key={index} className="bg-white">
                <th
                  scope="row"
                  className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap"
                >
                  {(index += 1)}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap"
                >
                  {receivedRecord?.documentOriginInfo?.doc_given_number}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap"
                >
                  {receivedRecord?.documentOriginInfo?.documentType?.name}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4  font-medium text-gray-900"
                >
                  {receivedRecord?.documentOriginInfo?.summary}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap"
                >
                  {FormatDateTime(
                    receivedRecord?.documentOriginInfo?.createdAt
                  )}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap"
                >
                  {receivedRecord?.documentOriginInfo?.created_by?.unit?.name}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap"
                >
                  {receivedRecord?.receiver?.firstNameEn}{" "}
                  {receivedRecord?.receiver?.lastNameEn}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap"
                >
                  test
                </th>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

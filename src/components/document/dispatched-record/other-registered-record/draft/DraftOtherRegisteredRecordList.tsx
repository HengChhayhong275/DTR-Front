/* eslint-disable @typescript-eslint/no-explicit-any */
import { DraftRecord } from "@/@types";
import { FormatDateTime } from "@/components/functions/FormatDateTime";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { ToastError } from "@/components/toast/ToastError";
import { ToastSucess } from "@/components/toast/ToastSucess";
import {
  useDeleteDraftOtherRecordMutation,
  useGetDraftOtherRecordsQuery,
} from "@/store/features/draft/draftRecordApiSlice";
import { Button, Empty, Modal } from "antd";
import { FaEye, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { useNavigate } from "react-router";

const DraftOtherRegisteredRecordList = () => {
  const navigate = useNavigate();

  const { data: draftOtherRecords } = useGetDraftOtherRecordsQuery(undefined);
  const [deleteDraftOtherRecord, { isLoading }] =
    useDeleteDraftOtherRecordMutation();
  const handleDeleteDraftSelfRecord = async (id: string | undefined) => {
    try {
      await deleteDraftOtherRecord(id).unwrap();
      ToastSucess("Draft Self Registered Record deleted successfully.");
    } catch (error: any) {
      console.log(error);
      ToastError(error?.data?.message);
    }
  };

  if (isLoading) {
    <LoadingSpinner color="black" />;
  }

  if (draftOtherRecords?.length === 0) {
    return(
      <div className="h-[400px] flex justify-center items-center">
        <Empty />
      </div>
    ) ;
  }

  return (
    <div className="relative">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              Registered Date
            </th>
            <th scope="col" className="px-4 py-3">
              Document Type
            </th>
            <th scope="col" className="px-4 py-3">
              Status
            </th>
            <th scope="col" className=" px-6 py-3 text-start w-[100px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {draftOtherRecords ? (
            draftOtherRecords?.map(
              (draftOtherRecord: DraftRecord, index: number) => (
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
                    {draftOtherRecord?.documentOriginInfo?.doc_given_number}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 dark:text-white"
                  >
                    {draftOtherRecord?.documentOriginInfo?.summary}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {FormatDateTime(
                      draftOtherRecord?.documentOriginInfo?.createdAt
                    )}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {draftOtherRecord?.documentOriginInfo?.documentType?.name}
                  </th>

                  {draftOtherRecord?.request_transaction?.transaction_status
                    ?.pending ? (
                    <th
                      scope="row"
                      className="px-4 py-4 font-medium text-yellow-400 whitespace-nowrap"
                    >
                      Pending
                    </th>
                  ) : draftOtherRecord?.request_transaction?.transaction_status
                      ?.accepted ? (
                    <th
                      scope="row"
                      className="px-4 py-4 font-medium text-green-500 whitespace-nowrap"
                    >
                      Accepted
                    </th>
                  ) : draftOtherRecord?.request_transaction?.transaction_status
                      ?.rejected ? (
                    <th
                      scope="row"
                      className="px-4 py-4 font-medium text-red-500 whitespace-nowrap"
                    >
                      Rejected
                    </th>
                  ) : (
                    <th
                      scope="row"
                      className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Draft
                    </th>
                  )}

                  <td className="px-4 py-4 text-gray-900 relative ">
                    test
                    {/* <Dropdown
                      className="w-full"
                      renderTrigger={() => (
                        <Button className="border-custom-blue text-custom-blue hover:!bg-blue-600 hover:!text-white p-1">
                          <IoMdMore />
                        </Button>
                      )}
                      placement="bottom"
                      label=""
                    >
                      <Dropdown.Item
                        className="text-gray-900 text-xs flex gap-x-2"
                        onClick={() => {
                          //   navigate(`/users/${documentOriginInfo?.id}`);
                        }}
                      >
                        <FaEye />
                        View More
                      </Dropdown.Item>
                      <Dropdown.Item
                        className="text-gray-900 text-xs flex gap-x-2"
                        onClick={() => {
                          //   navigate(`/out-records/${documentOriginInfo?.id}/edit`);
                        }}
                      >
                        <FaPencilAlt />
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          Modal.confirm({
                            title: "Are you sure you want to delete this user?",
                            // content: `${documentOriginInfo?.doc_given_number} ${documentOriginInfo?.summary}`,
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
                                    // handleDeleteDocumentOriginInfo(
                                    //   documentOriginInfo?.id
                                    // );
                                    Modal.destroyAll();
                                  }}
                                >
                                  Sure
                                </Button>
                              </>
                            ),
                          });
                        }}
                        className="text-gray-900 text-xs flex gap-x-2"
                      >
                        <FaRegTrashAlt />
                        Remove
                      </Dropdown.Item>
                    </Dropdown> */}
                  </td>
                </tr>
              )
            )
          ) : (
            <tr>
              <th scope="row"></th>
              <th scope="row"></th>
              <th scope="row"></th>
              <th scope="row"></th>
              <th scope="row"></th>
              <th scope="row"></th>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DraftOtherRegisteredRecordList;

import { DraftRecord } from "@/@types";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { ToastError } from "@/components/toast/ToastError";
import { ToastSucess } from "@/components/toast/ToastSucess";
import { useGetDocGivenNumberQuery } from "@/store/features/document/selfRegisteredRecordApiSlice";
import {
  useDeleteDraftSelfRecordMutation,
  useGetDraftSelfRecordsQuery,
} from "@/store/features/draft/draftRecordApiSlice";
import { Button, Dropdown, Empty, Menu, MenuProps, Modal } from "antd";
import { FaEye, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";

const DraftRegisteredRecordList = () => {
  const { data: documentGivenNumber } = useGetDocGivenNumberQuery(undefined);
  const { data: draftSelfRecords } = useGetDraftSelfRecordsQuery(undefined);
  const [deleteDraftSelfRecord, { isLoading }] =
    useDeleteDraftSelfRecordMutation();
  const handleDeleteDraftSelfRecord = async (id: string | undefined) => {
    try {
      await deleteDraftSelfRecord(id).unwrap();
      ToastSucess("Draft Self Registered Record deleted successfully.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      ToastError(error?.data?.message);
    }
  };

  if (isLoading) {
    <LoadingSpinner color="black" />;
  }

  if (draftSelfRecords?.length === 0) {
    return(
      <div className="h-[400px] flex justify-center items-center">
        <Empty />
      </div>
    ) ;
  }
  
  return (
    <div className="relative">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3">
              No
            </th>
            <th scope="col" className="px-4 py-3">
              Requested By
            </th>
            <th scope="col" className="px-4 py-3">
              Document ID
            </th>
            <th scope="col" className="px-4 py-3">
              summary
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
          {draftSelfRecords &&
            draftSelfRecords?.map(
              (draftSelfRecord: DraftRecord, index: number) => (
                <tr key={index} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {(index += 1)}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {draftSelfRecord?.request_transaction?.requested_by?.name}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900"
                  >
                    {documentGivenNumber?.doc_given_number}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900"
                  >
                    {draftSelfRecord?.documentOriginInfo?.summary}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {draftSelfRecord?.documentOriginInfo?.documentType?.name}
                  </th>
                  {draftSelfRecord?.request_transaction === null ? (
                    <th
                      scope="row"
                      className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      Draft
                    </th>
                  ) : (
                    <th
                      scope="row"
                      className="px-4 py-4 font-medium text-yellow-400 whitespace-nowrap"
                    >
                      Pending
                    </th>
                  )}

                  <td className="px-4 py-4 text-gray-900 relative ">
                    <Dropdown
                      autoAdjustOverflow={true}
                      dropdownRender={() => {
                        const items: MenuProps["items"] = [
                          {
                            label: (
                              <Link
                                className="flex items-center gap-x-2"
                                to={`/draft/self-registered/${draftSelfRecord.id}`}
                              >
                                <FaEye />
                                View More
                              </Link>
                            ),
                            key: "1",
                          },
                          {
                            label: (
                              <Link
                                className="flex items-center gap-x-2"
                                to={`/draft/self-registered/${draftSelfRecord.id}/edit`}
                              >
                                <FaPencilAlt />
                                Edit
                              </Link>
                            ),
                            key: "2",
                          },
                          {
                            label: (
                              <a className="flex items-center gap-x-2">
                                <FaRegTrashAlt />
                                Remove
                              </a>
                            ),
                            key: "3",
                            onClick: () => {
                              Modal.confirm({
                                title:
                                  "Are you sure you want to delete this user?",
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
                                      className="bg-green-500 hover:!text-green-400 hover:!border-green-400 text-white"
                                      onClick={() => {
                                        handleDeleteDraftSelfRecord(
                                          draftSelfRecord?.id
                                        );
                                        Modal.destroyAll();
                                      }}
                                    >
                                      Sure
                                    </Button>
                                  </>
                                ),
                              });
                            },
                          },
                        ];
                        return <Menu items={items} />;
                      }}
                      trigger={["click"]}
                    >
                      <Button
                        className="items-center flex justify-center p-1"
                        onClick={(e) => e.preventDefault()}
                      >
                        <IoMdMore />
                      </Button>
                    </Dropdown>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default DraftRegisteredRecordList;

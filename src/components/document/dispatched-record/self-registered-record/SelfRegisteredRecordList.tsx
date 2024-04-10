import { SelfRegisteredRecord } from "@/@types/self-registered-record";
import { FormatDateTime } from "@/components/functions/FormatDateTime";
import { DispatchModal } from "@/components/modal/dispatch-modal/DispatchModal";
import { DispatchStatusModal } from "@/components/modal/dispatch-modal/DispatchStatusModal";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import {
  useDeleteSelfRegisteredRecordMutation,
  useGetSelfRegisteredRecordsQuery,
} from "@/store/features/document/selfRegisteredRecordApiSlice";
import { Button, Dropdown, Empty, Menu, MenuProps, Modal } from "antd";

import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { RecordStatusInfo } from "../../RecordStatusInfo";
import { IoMdMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaEye, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";

const SelfRegisteredRecordList = () => {
  const { data: selfRegisteredRecords } =
    useGetSelfRegisteredRecordsQuery(undefined);
  const [deleteSelfRegisteredRecord, { isLoading: fetchSelfRecordLoading }] =
    useDeleteSelfRegisteredRecordMutation();

  const [openDispatch, setOpenDispatch] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<SelfRegisteredRecord>();

  const handleDeleteSelfRegisteredRecord = async (id: string) => {
    try {
      await deleteSelfRegisteredRecord(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  if (fetchSelfRecordLoading) {
    <LoadingSpinner color="black" />;
  }

  if (selfRegisteredRecords?.length === 0) {
    return(
      <div className="h-[400px] flex justify-center items-center">
        <Empty />
      </div>
    ) ;
  }

  return (
    <div className="relative">
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
              Status
            </th>
            <th scope="col" className=" px-4 py-3  text-start w-[100px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {selfRegisteredRecords &&
            selfRegisteredRecords?.map(
              (selfRegisteredRecord: SelfRegisteredRecord, index: number) => (
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
                    {selfRegisteredRecord?.documentOriginInfo?.doc_given_number}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap"
                  >
                    {
                      selfRegisteredRecord?.documentOriginInfo?.documentType
                        ?.name
                    }
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4  font-medium text-gray-900"
                  >
                    {selfRegisteredRecord?.documentOriginInfo?.summary}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap"
                  >
                    {FormatDateTime(
                      selfRegisteredRecord?.documentOriginInfo?.createdAt
                    )}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap"
                  >
                    <div className="cursor-pointer">
                      <RecordStatusInfo record={selfRegisteredRecord} />
                    </div>
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 flex items-center justify-between gap-x-2"
                  >
                    <div className="w-full">
                      {selfRegisteredRecord?.record_status?.draft ? (
                        <Button
                          onClick={() => {
                            setSelectedRecord(selfRegisteredRecord);
                            setOpenDispatch(true);
                          }}
                          className=" hover:!border-custom-blue hover:!text-custom-blue bg-custom-blue text-white !w-full disabled:!bg-slate-200 disabled:!text-slate-400"
                        >
                          Dispatch
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setSelectedRecord(selfRegisteredRecord);
                            setStatusModal(true);
                          }}
                          className="hover:!border-green-500 hover:!text-green-500 bg-green-500 text-white !w-full disabled:!bg-slate-200 disabled:!text-slate-400"
                        >
                          Track Status
                        </Button>
                      )}
                    </div>
                    <Dropdown
                      autoAdjustOverflow={true}
                      dropdownRender={() => {
                        const items: MenuProps["items"] = [
                          {
                            label: (
                              <Link
                                className="flex items-center gap-x-2"
                                to={`/self-registered/${selfRegisteredRecord?.id}`}
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
                                to={`/self-registered/${selfRegisteredRecord?.id}/edit`}
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
                                  "Are you sure you want to delete this Document Record?",
                                content: `${selfRegisteredRecord?.documentOriginInfo?.doc_given_number} ${selfRegisteredRecord?.documentOriginInfo?.summary}`,
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
                                        handleDeleteSelfRegisteredRecord(
                                          selfRegisteredRecord?.id
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
                  </th>
                </tr>
              )
            )}
        </tbody>
      </table>
      <DispatchModal
        setOpen={setOpenDispatch}
        open={openDispatch}
        record={selectedRecord}
        type="Self"
      />
      <DispatchStatusModal
        setOpen={setStatusModal}
        open={statusModal}
        record={selectedRecord}
      />
    </div>
  );
};

export default SelfRegisteredRecordList;

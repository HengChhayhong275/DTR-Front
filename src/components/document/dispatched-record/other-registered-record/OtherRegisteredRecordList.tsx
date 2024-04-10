/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormatDateTime } from "@/components/functions/FormatDateTime";
import { DispatchModal } from "@/components/modal/dispatch-modal/DispatchModal";
import { DispatchStatusModal } from "@/components/modal/dispatch-modal/DispatchStatusModal";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { ToastError } from "@/components/toast/ToastError";
import { ToastSucess } from "@/components/toast/ToastSucess";
import { Button, Dropdown, Empty, Menu, MenuProps, Modal } from "antd";

import { useState } from "react";
import { FaEye, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { IoMdMore } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import {
  useDeleteOtherRegisteredRecordMutation,
  useGetOtherRegisteredRecordsQuery,
} from "@/store/features/document/otherRegisteredRecordApiSlice";
import { OtherRegisteredRecord } from "@/@types";
import { Link } from "react-router-dom";
import { RecordStatusInfo } from "../../RecordStatusInfo";

export const OtherRegisteredRecordList = () => {
  const { data: otherRegisteredRecords } =
    useGetOtherRegisteredRecordsQuery(undefined);

  const [deleteOtherRegisteredRecord, { isLoading: fetchSelfRecordLoading }] =
    useDeleteOtherRegisteredRecordMutation();

  const [openDispatch, setOpenDispatch] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<OtherRegisteredRecord>();

  const handleDeleteSelfRegisteredRecord = async (id: string) => {
    try {
      await deleteOtherRegisteredRecord(id).unwrap();
      ToastSucess("Document Self Record deleted successfully.");
    } catch (error: any) {
      console.log(error);
      ToastError(error?.data?.message);
    }
  };

  if (fetchSelfRecordLoading) {
    <LoadingSpinner color="black" />;
  }

  if (otherRegisteredRecords?.length === 0) {
    return(
      <div className="h-[400px] flex justify-center items-center">
        <Empty />
      </div>
    ) ;
  }

  console.log(otherRegisteredRecords);

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
            <th scope="col" className=" px-4 py-3 text-start w-[100px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {otherRegisteredRecords &&
            otherRegisteredRecords?.map(
              (otherRegisteredRecord: OtherRegisteredRecord, index: number) => (
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
                    {
                      otherRegisteredRecord?.documentOriginInfo
                        ?.doc_given_number
                    }
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap"
                  >
                    {
                      otherRegisteredRecord?.documentOriginInfo?.documentType
                        ?.name
                    }
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4  font-medium text-gray-900"
                  >
                    {otherRegisteredRecord?.documentOriginInfo?.summary}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap"
                  >
                    {FormatDateTime(
                      otherRegisteredRecord?.documentOriginInfo?.createdAt
                    )}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4  font-medium text-gray-900 whitespace-nowrap"
                  >
                    <div className="cursor-pointer">
                      <RecordStatusInfo record={otherRegisteredRecord} />
                    </div>
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 flex items-center justify-between gap-x-4 relative"
                  >
                    <div className="w-full flex gap-x-4">
                      {otherRegisteredRecord?.record_status?.draft ? (
                        <Button
                          onClick={() => {
                            setSelectedRecord(otherRegisteredRecord);
                            setOpenDispatch(true);
                          }}
                          className=" hover:!border-custom-blue hover:!text-custom-blue bg-custom-blue text-white !w-full disabled:!bg-slate-200 disabled:!text-slate-400"
                        >
                          Dispatch
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setSelectedRecord(otherRegisteredRecord);
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
                                to={`/other-registered/${otherRegisteredRecord?.id}`}
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
                                to={`/other-registered/${otherRegisteredRecord?.id}/edit`}
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
                                        handleDeleteSelfRegisteredRecord(
                                          otherRegisteredRecord?.id
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
        type="Other"
      />
      <DispatchStatusModal
        setOpen={setStatusModal}
        open={statusModal}
        record={selectedRecord}
      />
    </div>
  );
};

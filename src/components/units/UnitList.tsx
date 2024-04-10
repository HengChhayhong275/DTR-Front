import { Unit } from "@/@types";
import {
  useDeleteUnitMutation,
  useGetUnitsQuery,
} from "@/store/features/unit/unitApiSlice";
import { FaPencilAlt, FaQrcode, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import { LoadingSpinner } from "../spinner/LoadingSpinner";
import { Button, Empty, Modal, Tooltip } from "antd";
import { ToastSucess } from "../toast/ToastSucess";
import { ToastError } from "../toast/ToastError";
import { UnitQrModal } from "../modal/UnitQrModal";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export const UnitList = () => {
  const navigate = useNavigate();

  const [pin, setPin] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState(false);

  const { data: units } = useGetUnitsQuery(undefined);
  const [deleteUnit, { isLoading }] = useDeleteUnitMutation();

  const handleDeleteUnit = async (id: string) => {
    try {
      await deleteUnit(id).unwrap();
      ToastSucess("Unit deleted successfully.");
      navigate("/units");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      ToastError(error?.data?.message);
    }
  };

  if (isLoading) {
    <LoadingSpinner color="black" />;
  }

  if (units?.length === 0) {
    return(
      <div className="h-[400px] flex justify-center items-center">
        <Empty />
      </div>
    ) ;
  }

  return (
    <div className="relative overflow-auto mt-4">
      <ToastContainer />
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3">
              No
            </th>
            <th scope="col" className="px-4 py-3">
              Unit
            </th>
            <th scope="col" className="px-4 py-3">
              Abbreviation
            </th>
            <th scope="col" className="px-4 py-3">
              Unit Pin
            </th>
            <th scope="col" className=" px-6 py-3 text-start w-[200px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {units &&
            units?.map((unit: Unit, index: number) => (
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
                  className="px-4 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {unit?.name}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {unit?.abbre_name}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {unit?.unitPin}
                </th>
                <td className="px-4 py-4 text-gray-900 flex gap-x-2">
                  <Tooltip placement="top" title={"QR"}>
                    <Button
                      type="primary"
                      className="py-2 px-4 bg-custom-blue text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!bg-blue-600 hover:!text-white"
                      onClick={() => {
                        setPin(unit?.unitPin);
                        setName(unit?.name);
                        setOpen(true);
                      }}
                    >
                      <FaQrcode />
                    </Button>
                  </Tooltip>
                  <Tooltip placement="top" title={"Edit"}>
                    <Button
                      className="items-center flex bg-green-500 hover:!bg-green-400"
                      type="primary"
                      onClick={() => {
                        navigate(`/units/${unit?.id}/edit`);
                      }}
                    >
                      <FaPencilAlt />
                    </Button>
                  </Tooltip>
                  <Tooltip placement="top" title={"Delete"}>
                    <Button
                      type="primary"
                      className="items-center flex"
                      danger
                      onClick={() => {
                        Modal.confirm({
                          title: "Are you sure you want to delete this unit?",
                          content: `${unit?.name}`,
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
                                  handleDeleteUnit(unit?.id);
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
                      {isLoading ? (
                        <LoadingSpinner color="white" />
                      ) : (
                        <FaTrashAlt />
                      )}
                    </Button>
                  </Tooltip>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <UnitQrModal setOpen={setOpen} open={open} pin={pin} name={name} />
    </div>
  );
};

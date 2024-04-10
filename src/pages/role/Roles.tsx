import { Role } from "@/@types";
import { Accordion } from "@/components/Accordion";
import { CreateButton } from "@/components/button/CreateButton";
import { CreateRoleModal } from "@/components/modal/role-modal/CreateRoleModal";
import { UpdateRoleModal } from "@/components/modal/role-modal/UpdateRoleModal";
import { SearchFilter } from "@/components/SearchFilter";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { useGetRolesQuery } from "@/store/features/role/roleApiSlice";
import { Breadcrumb, Button, Empty, Modal, Tooltip } from "antd";
import { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export const Roles = () => {
  const { data: roles, isLoading } = useGetRolesQuery(undefined);

  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>();

  if (isLoading) {
    <LoadingSpinner color="black" />;
  }

  return (
    <div className="flex flex-col w-full gap-y-4">
      <div className="flex justify-between items-center w-full">
        <div>
          <Breadcrumb
            separator=">"
            items={[
              {
                title: <Link to={"/dashboard"}>Dashboard</Link>,
              },
              {
                title: "Roles",
              },
            ]}
          />
          <h1 className="text-2xl font-bold mb-2">Manage Role</h1>
        </div>
        <CreateButton
          title="Create new role"
          onClick={() => {
            setModal(true);
          }}
        />
      </div>

      <div>
        <Accordion children={<SearchFilter />} title={"Search and Filter :"} />
      </div>

      <UpdateRoleModal
        open={updateModal}
        setOpen={setUpdateModal}
        role={selectedRole}
      />
      <CreateRoleModal open={modal} setOpen={setModal} />

      <UpdateRoleModal
        open={updateModal}
        setOpen={setUpdateModal}
        role={selectedRole}
      />
      <ToastContainer />
      {roles?.lenght === 0 ? (
        <Empty />
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3">
                No
              </th>
              <th scope="col" className="px-4 py-3">
                Role name
              </th>
              <th scope="col" className="px-4 py-3">
                Description
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {roles &&
              roles?.map((role: Role, index: number) => (
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
                    {role?.name}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 w-1/3"
                  >
                    {role?.description}
                  </th>
                  <th
                    scope="row"
                    className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-x-4 items-center"
                  >
                    <Tooltip placement="top" title={"Edit"}>
                      <Button
                        type="primary"
                        className="py-2 px-4 bg-green-500 text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!bg-green-400 hover:!text-white"
                        onClick={() => {
                          setSelectedRole(role);
                          setUpdateModal(true);
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
                            content: `${role?.name}`,
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
                                    // handleDeleteUnit(unit?.id);
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
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

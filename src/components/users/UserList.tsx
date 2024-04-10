import { User } from "@/@types";
import { Empty } from "antd";
import { useNavigate } from "react-router";
import { LoadingSpinner } from "../spinner/LoadingSpinner";
import { ToastContainer } from "react-toastify";
import { ViewButton } from "../button/ViewButton";

export const UserList = ({
  users,
  isLoading,
}: {
  users: User[] | undefined;
  isLoading: boolean;
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    <LoadingSpinner color="black" />;
  }

  if (users?.length === 0) {
    return (
      <div className="h-[400px] flex justify-center items-center">
        <Empty />
      </div>
    );
  }

  return (
    <div className="relative overflow-auto mt-4">
      <ToastContainer />
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3">
              No
            </th>
            <th scope="col" className="px-4 py-3">
              Name
            </th>
            <th scope="col" className="px-4 py-3">
              Email
            </th>
            <th scope="col" className="px-4 py-3">
              Telephone
            </th>
            <th scope="col" className="px-4 py-3">
              Unit
            </th>
            <th scope="col" className="px-4 py-3">
              Role
            </th>
            <th scope="col" className=" px-6 py-3 text-start w-[120px]">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.map((user: User, index: number) => (
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
                  {user?.lastNameEn} {user?.firstNameEn}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user?.credential?.email}
                </th>
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user?.phoneNumber}
                </th>
                <td className="px-4 py-4 text-gray-900">{user?.unit.name}</td>
                <td className="px-4 py-4 text-gray-900">{user?.role.name}</td>

                <td className="px-2 py-4 text-gray-900 flex items-center justify-center">
                  <ViewButton
                    onClick={() => {
                      navigate(`/users/${user?.id}`);
                    }}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

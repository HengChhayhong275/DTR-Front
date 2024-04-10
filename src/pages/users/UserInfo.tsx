import { useNavigate, useParams } from "react-router";
import User from "@/assets/images/User.png";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { Button, Modal } from "antd";
import {
  useDeleteUserMutation,
  useGetUserQuery,
} from "@/store/features/user/userApiSlice";
import { LoadingSpinner } from "@/components/spinner/LoadingSpinner";
import { GoBackArrow } from "@/components/button/GoBackArrow";
import { ChangeUserPasswordModal } from "@/components/modal/user-modal/ChangeUserPasswordModal";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export const UserInfo = () => {
  const { id } = useParams();
  const { data: user } = useGetUserQuery(id);
  const gender: string = user?.gender;
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const navigate = useNavigate();

  const handleDeleteUser = async (id: string | undefined) => {
    try {
      await deleteUser(id).unwrap();
      navigate("/users");
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);

  const [selectedUserId, setSelectUserId] = useState<string | undefined>("");

  return (
    <div className="bg-white p-8 w-full flex flex-col gap-y-4">
      <div className="flex justify-between w-full max-h-[45px]">
        <div className="max-h-[40px]">
          <ToastContainer />
          <GoBackArrow url="users" />
        </div>
        <div className="flex gap-x-4">
          <Button
            className="py-2 px-4 bg-green-500 text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!border-green-400 hover:!text-green-400"
            onClick={() => {
              navigate(`/users/${user?.id}/edit`);
            }}
          >
            <FaPencilAlt />
            Edit
          </Button>

          <Button
            type="primary"
            className="py-2 px-4 bg-custom-blue text-white rounded-lg flex gap-x-2 items-center text-base h-full hover:!bg-blue-600 hover:!text-white"
            onClick={() => {
              setSelectUserId(id);
              setOpen(true);
            }}
          >
            <FaLock />
            Change Password
          </Button>
          <Button
            className="py-2 px-4 text-white rounded-lg flex gap-x-2 items-center text-base h-full bg-red-600 hover:!text-red-600 hover:!border-red-600"
            onClick={() => {
              Modal.confirm({
                title: "Are you sure you want to delete this user?",
                content: `${user?.firstNameEn} ${user?.lastNameEn}`,
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
                        handleDeleteUser(id);
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
            {isLoading ? <LoadingSpinner color="white" /> : <FaTrashAlt />}
            Remove
          </Button>
        </div>
      </div>
      <h1 className="text-2xl">User Info</h1>
      <img src={User} className="max-w-[200px]" />
      <div className="grid grid-cols-4 gap-y-8 text-sm font-normal text-black">
        <div>
          <p className="text-slate-600 text-base mb-1">Firstname(En):</p>
          <p className="text-base">{user?.firstNameEn}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Lastname(En):</p>
          <p className="text-base">{user?.lastNameEn}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Firstname(Kh):</p>
          <p className="text-base">{user?.firstNameKh}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Lastname(Kh):</p>
          <p className="text-base">{user?.lastNameKh}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Gender:</p>
          <p className="text-base">{gender?.toUpperCase()}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Nationality:</p>
          <p className="text-base">{user?.nationality}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Address:</p>
          <p className="text-base">{user?.address}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Date of Birth:</p>
          <p className="text-base">{user?.dob}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Email:</p>
          <p className="text-base">{user?.credential.email}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Phone Number:</p>
          <p className="text-base">{user?.phoneNumber}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Unit:</p>
          <p className="text-base">{user?.unit?.name}</p>
        </div>
        <div>
          <p className="text-slate-600 text-base mb-1">Role:</p>
          <p className="text-base">{user?.role?.name}</p>
        </div>
      </div>
      <ChangeUserPasswordModal
        open={open}
        setOpen={setOpen}
        userId={selectedUserId}
      />
    </div>
  );
};

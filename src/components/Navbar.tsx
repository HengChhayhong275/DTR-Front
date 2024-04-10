
import { GiHamburgerMenu } from "react-icons/gi";
import MPTC_Logo2 from "@/assets/images/Logo_MPTC02.png";
import Users from "@/assets/images/User.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import {
  logout as Logout,
  selectAuthUser,
  setCurrentUser,
} from "@/store/features/auth/authSlice";
import {
  useGetAuthUserQuery,
  useLogoutMutation,
} from "@/store/features/auth/authApiSlice";
import { useEffect } from "react";

type Props = {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
};

const dropDownItemStype: React.CSSProperties = {
  height: "50px",
};

const Navbar = ({ collapsed, setCollapsed }: Props) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <p>Dashboard</p>,
      style: dropDownItemStype,
    },
    {
      key: "2",
      label: <p>Profile</p>,
      style: dropDownItemStype,
    },
    {
      key: "3",
      label: <p>Logout</p>,
      style: dropDownItemStype,
    },
  ];

  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const onClick: MenuProps["onClick"] = async ({ key }) => {
    if (key === "1") {
      navigate("/dashboard");
    }
    if(key === "2"){
      navigate("/profile")
    }
    if (key === "3") {
      try {
        await logout(undefined)
          .unwrap()
          .then(() => dispatch(Logout()));
      } catch (error) {
        console.log(error);
      }
    }

  };

  const navigate = useNavigate();
  const { data: authUser, isLoading } = useGetAuthUserQuery(undefined);
  const currentUser = useSelector(selectAuthUser);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setCurrentUser(authUser));
    }
  }, [isLoading, authUser, currentUser, dispatch]);

  return (
    <nav className="bg-white  dark:bg-gray-900 fixed top-0 left-0 right-0 z-10 pl-4">
      <div className=" flex flex-wrap items-center justify-between py-4 px-5">
        <div className="flex items-center gap-x-4">
          <GiHamburgerMenu
            size={17}
            className="cursor-pointer text-white bg-custom-blue p-2 rounded-sm"
            onClick={() => setCollapsed(!collapsed)}
          />
          <Link
            to="dashboard"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={MPTC_Logo2} className="h-[75px]" alt="MPTC Logo" />
          </Link>
        </div>
        <div className="flex gap-x-8 pr-8">
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <p className="mr-4 font-semibold">
              {authUser?.firstNameEn} {authUser?.lastNameEn}
            </p>
            <Dropdown menu={{ items, onClick }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <img
                    className="w-10 rounded-full"
                    src={Users}
                    alt="user photo"
                  />
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

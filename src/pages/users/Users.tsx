import { Accordion } from "@/components/Accordion";
import { CreateButton } from "@/components/button/CreateButton";
import { SearchFilter } from "@/components/SearchFilter";
import { UserList } from "@/components/users/UserList";
import { useGetUsersQuery } from "@/store/features/user/userApiSlice";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";


export const Users = () => {

  const {data: users, isLoading} = useGetUsersQuery(undefined)

  const navigate = useNavigate();
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
                title: "Users",
              },
            ]}
          />
          <h1 className="text-2xl font-bold mb-2">Manage User</h1>
        </div>
        <CreateButton
          title="Create a new user"
          onClick={() => {
            navigate(`/users/create`);
          }}
        />
      </div>

      <div>
        <Accordion title={"Search and Filter :"}>
        <SearchFilter/>      
        </Accordion>
      </div>

      <UserList users={users} isLoading={isLoading}/>
    </div>
  );
};

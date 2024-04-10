import { CreateButton } from "@/components/button/CreateButton";
import { ReceivedRecordList } from "@/components/document/received-record/ReceivedRecordList";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const ReceivedRecord = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between w-full items-end">
        <div>
          <Breadcrumb
            separator=">"
            items={[
              {
                title: <Link to={"/dashboard"}>Dashboard</Link>,
              },
              {
                title: "Received Record List",
              },
            ]}
          />
          <h1 className="text-2xl font-bold mb-2">Received Record</h1>
        </div>
        <div className="flex gap-x-4">
          <CreateButton
            title="Create Record"
            onClick={() => {
              navigate(`create`);
            }}
          />
        </div>
      </div>
      <ReceivedRecordList />
    </div>
  );
};

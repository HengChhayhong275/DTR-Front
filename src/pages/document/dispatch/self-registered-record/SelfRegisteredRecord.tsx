import { CreateButton } from "@/components/button/CreateButton";
import { ViewButton } from "@/components/button/ViewButton";
import SelfRegisteredRecordList from "@/components/document/dispatched-record/self-registered-record/SelfRegisteredRecordList";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const SelfRegisteredRecord = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between w-full items-center">
        <div>
          <Breadcrumb
            separator=">"
            items={[
              {
                title: <Link to={"/dashboard"}>Dashboard</Link>,
              },
              {
                title: "Self-Registered List",
              },
            ]}
          />
          <h1 className="text-2xl font-bold mb-2">Self Registered Record</h1>
        </div>
        <div className="flex gap-x-4">
          <CreateButton
            title="Create Record"
            onClick={() => {
              navigate(`/self-registered/create`);
            }}
          />
          <ViewButton
            title="View Drafts"
            onClick={() => {
              navigate(`/draft/self-registered`);
            }}
          />
          <ViewButton
            title="Dispated Record"
            onClick={() => {
              navigate(`/self-registered/dispatched`);
            }}
          />
        </div>
      </div>
      <SelfRegisteredRecordList />
    </div>
  );
};

export default SelfRegisteredRecord;

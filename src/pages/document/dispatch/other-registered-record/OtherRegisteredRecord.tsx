import { CreateButton } from "@/components/button/CreateButton";
import { ViewButton } from "@/components/button/ViewButton";
import { OtherRegisteredRecordList } from "@/components/document/dispatched-record/other-registered-record/OtherRegisteredRecordList";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const OtherRegisteredRecord = () => {
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
                title: "Other-Registered List",
              },
            ]}
          />
          <h1 className="text-2xl font-bold my-0 mb-2">
            Other Registered Record
          </h1>
        </div>
        <div className="flex gap-x-4">
          <CreateButton
            title="Create Record"
            onClick={() => {
              navigate(`/other-registered/create`);
            }}
          />
          <ViewButton
            title="View Drafts"
            onClick={() => {
              navigate(`/draft/other-registered`);
            }}
          />
        </div>
      </div>
      <OtherRegisteredRecordList />
    </div>
  );
};

export default OtherRegisteredRecord;

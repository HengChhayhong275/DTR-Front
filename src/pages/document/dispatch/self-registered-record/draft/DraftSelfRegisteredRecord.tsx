import { Breadcrumb } from "antd";
import DraftSelfRegisteredRecordList from "../../../../../components/document/dispatched-record/self-registered-record/draft/DraftSelfRegisteredRecordList";
import { Link } from "react-router-dom";

export const DraftSelfRegisteredRecord = () => {
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
                title: (
                  <Link to={"/self-registered"}>Self-Registered List</Link>
                ),
              },
              {
                title: "Draft Self Registered List",
              },
            ]}
          />
          <h1 className="text-2xl font-bold mb-2">
            Draft Self Registered List
          </h1>
        </div>
      </div>
      <DraftSelfRegisteredRecordList />
    </div>
  );
};

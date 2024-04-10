import { Accordion } from "@/components/Accordion";
import { CreateButton } from "@/components/button/CreateButton";
import { SearchFilter } from "@/components/SearchFilter";
import { UnitList } from "@/components/units/UnitList";
import { Breadcrumb } from "antd";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Units = () => {
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
                title: "Units",
              },
            ]}
          />
          <h1 className="text-2xl font-bold mb-2">Manage Unit</h1>
        </div>
        <CreateButton
          title="Create new unit"
          onClick={() => {
            navigate("/units/create");
          }}
        />
      </div>

      <div>
        <Accordion children={<SearchFilter />} title={"Search and Filter :"} />
      </div>

      <UnitList />
    </div>
  );
};

export default Units;

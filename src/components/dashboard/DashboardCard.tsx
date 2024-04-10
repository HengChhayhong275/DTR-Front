import { Link } from "react-router-dom";
import folder from "@/assets/images/folder.png";
import folder1 from "@/assets/images/folder1.png";

const DashboardCard = () => {
  const menus = [
    {
      name: "Self-Registered Record List",
      url: "/self-registered",
      icon: folder,
      amount: 10,
      bg: "bg-[#FDECDF]",
    },
    {
      name: "Other-Registered Record List",
      url: "/other-registered",
      icon: folder1,
      amount: 10,
      bg: "bg-[#FFE8FF]",
    },
    {
      name: "Dispatched Record List",
      url: "",
      icon: folder,
      amount: 10,
      bg: "bg-[#CDEEFF]",
    },
    {
      name: "Accepted Record List",
      url: "/received-record/accepted",
      icon: folder1,
      amount: 10,
      bg: "bg-[#CBEFFB]",
    },
    {
      name: "Dropped-Off Record List",
      url: "/received-record/dropped-off",
      icon: folder,
      amount: 10,
      bg: "bg-[#FAE1E7]",
    },
    {
      name: "Requested Record List",
      url: "/draft/self-registered",
      icon: folder1,
      amount: 10,
      bg: "bg-[#DDFAF1]",
    },
  ];

  return (
    <section className="grid grid-cols-3 gap-8">
      {menus?.map((menu, index) => (
        <Link
          to={menu.url}
          key={index}
        >
          <div className="max-w-sm bg-[#e6f4ff] border border-gray-200 rounded-lg shadow grid grid-cols-1 text-custom-blue">
            <div className="h-fit rounded-t-lg bg-blue-200 flex top-0 w-full justify-center p-1">
              <p className="text-lg font-bold">{menu.name}</p>
            </div>
            <div className="h-auto flex items-center justify-between p-4 px-6">
              <div>
                <p className="text-4xl font-semibold text-custom-orange">
                  {menu.amount}
                </p>
                <p className="font-semibold">Records</p>
              </div>
              <img src={menu.icon} alt="Logo" className="w-[60px]" />
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default DashboardCard;

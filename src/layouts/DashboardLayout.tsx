import { useEffect, useState } from "react";
import { Layout } from "antd";
import Navbar from "@/components/Navbar";
import { Outlet, useLocation } from "react-router";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const location = useLocation();

  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/dashboard"
      : location.pathname
  );

  useEffect(() => {
    if (location) {
      if (!location.pathname.includes(current)) {
        setCurrent(location.pathname);
      }
      if(location.pathname === '/draft/self-registered'){
        setCurrent(location.pathname)
      }
      if(location.pathname === '/other-registered/draft'){
        setCurrent(location.pathname)
      }
    }
  }, [location, current]);

  const { Content } = Layout;

  return (
    <>
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout style={{ minHeight: "90vh", marginTop: "107px" }}>
        <Sidebar
          collapsed={collapsed}
          current={current}
          setCurrent={setCurrent}
        />
        <Layout
        className="transition-all duration-500"
          style={{
            marginLeft: collapsed ? "70px" : "260px",
          }}
        >
          <Content style={{ overflow: "initial" }} className="p-8">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;

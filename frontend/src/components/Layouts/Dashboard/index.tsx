import { Outlet } from "react-router-dom";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Footer } from "./footer";

const Dashboard = () => {

  return (
    <>
      <div className="page-wraper">
        <Header />
        <Sidebar />
        <div id="content"><Outlet /></div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;

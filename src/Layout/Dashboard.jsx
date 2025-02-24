import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-80">
        <Sidebar />
      </div>
      <div className="flex-1 z-30">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

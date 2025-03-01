import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen  bg-gray-50">
      {/* Sidebar */}
      <div className="max-w-48">
        <Sidebar />
      </div>

      {/* Main Content - Mobile friendly padding */}
      <div className="flex-1 w-full lg:ml-20 xl:ml-48 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const Dashboard = () => {
  return (
    <div>
      <div className="header">
        <IoMdArrowRoundBack size={25} onClick={() => window.history.back()} className="pointer"/>
        {/* <h1 className="text-center">Header</h1> */}
      </div>

      <div className="d-flex w-100">
        <Sidebar />
        <div className="content">
          {/* Outlet will render child components based on routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

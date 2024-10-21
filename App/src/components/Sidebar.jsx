import { useState } from "react";
import { FaHome, FaTachometerAlt, FaCalendarAlt } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiFillProduct } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom"; // For navigation
import Submenu from "./Submenu"; // Ensure you have a Submenu component
import { toast } from "react-toastify";

const Sidebar = () => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null); // Track active menu
  const [activeSideBar, setActiveSideBar] = useState(false);
  const navigate = useNavigate(); // React Router's useNavigate for navigation

  const menuItems = [
    {
      name: "Home",
      icon: <FaHome width="16" height="16" />,
      submenu: [
        { name: "Submenu 1", link: "/dashboard" },
        { name: "Submenu 2", link: "/dashboard" },
        { name: "Submenu 3", link: "/dashboard" },
      ],
    },
    {
      name: "Dashboard",
      icon: <FaTachometerAlt width="16" height="16" />,
      submenu: [
        { name: "Submenu 1", link: "/dashboard" },
        { name: "Submenu 2", link: "/dashboard" },
        { name: "Submenu 3", link: "/dashboard" },
      ],
    },
    {
      name: "Orders",
      icon: <FaCalendarAlt width="16" height="16" />,
      submenu: [
        { name: "Weekly", link: "/dashboard/weekly" },
        { name: "Monthly", link: "/dashboard/monthly" },
        { name: "Yearly", link: "/dashboard/yearly" },
      ],
    },
    {
      name: "Products",
      icon: <AiFillProduct width="16" height="16" />,
      submenu: [
        { name: "Add Product", link: "/dashboard/add-product" },
        { name: "View Products", link: "/dashboard/view-product" },
      ],
    },
    {
      name: "Customers",
      icon: <BsFillPeopleFill width="16" height="16" />,
      submenu: [
        { name: "Submenu 1", link: "/dashboard" },
        { name: "Submenu 2", link: "/dashboard" },
        { name: "Submenu 3", link: "/dashboard" },
      ],
    },
    {
      name: "Logout",
      icon: <IoLogOut width="16" height="16" />,
      submenu: null,
    },
  ];

  const handleMenuClick = (item) => {
    if (item.name === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      toast.success(`🦄 Logged out successfully!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
      return;
    }

    if (item.submenu) {
      // Expand sidebar if it's collapsed
      if (!activeSideBar) {
        setActiveSideBar(true); // Expanding the sidebar
      }

      // Toggle submenu and update active menu
      if (activeMenu === item.name) {
        setActiveSubmenu(null);
        setActiveMenu(null);
      } else {
        setActiveSubmenu(item.name);
        setActiveMenu(item.name);
      }

      // navigate(item.submenu[0].link);
    } else {
      console.log(`${item.name} clicked`);

      if (!activeSideBar) {
        setActiveSideBar(true); // Expanding the sidebar
      }

      setActiveMenu(item.name); // Set active menu for non-submenu items

      // Use navigate to redirect
      if (item.name === "Dashboard") {
        navigate("/dashboard");
      }
    }
  };

  return (
    <>
      <div
        className={`d-flex flex-column flex-shrink-0 p-3 text-bg-dark sidebar ${
          !activeSideBar && "d-none"
        }`}
        style={{ width: "280px" }}
      >
        <Link
          to={"/dashboard"}
          className={`d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none ${
            !activeSideBar && "d-none fade"
          }`}
        >
          <RiAdminFill width="40" height="40" />{" "}
          <span className="fs-4">Admin</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleMenuClick(item)}
                className={`nav-link text-white fw-bold w-100 text-start ${
                  activeMenu === item.name ? "active" : ""
                }`}
                // style={{ background: "none", border: "none" }} // Style button like anchor
              >
                {activeSideBar && item.icon} {activeSideBar && item.name}
              </button>
              {activeSubmenu === item.name &&
                item.submenu &&
                item.submenu.length > 0 && <Submenu items={item.submenu} />}
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="bg-transparent border-0 float-end text-white position-absolute top-0 end-0 my-4 d-flex align-items-center fs-4"
        onClick={() => {
          // Toggle the sidebar
          setActiveSideBar((prev) => !prev);

          // If the sidebar is about to collapse, reset the active menu and submenu
          if (activeSideBar) {
            setActiveMenu(null);
            setActiveSubmenu(null);
          }
        }}
      >
        <GiHamburgerMenu width="40" height="40" className="text-white mx-3" />
      </button>
    </>
  );
};

export default Sidebar;

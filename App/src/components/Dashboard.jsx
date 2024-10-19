import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const Dashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    setLoggedInUser({
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
    });
  }, []);

  if (!loggedInUser) {
    return <h1>No User Data</h1>;
  }

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in local storage");
      }
      const response = await axios.get("https://panel-api-server.vercel.app/product", {
        headers: {
          Authorization: token,
        },
      });
      const data = response.data;
      if (!data) {
        throw new Error("No data found in response");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized, please login again");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div>
      <div className="header">
        <h1>Header</h1>
      </div>

      <div className="d-flex w-100">
      <Sidebar />
        <div className="content">
          <h1>Content</h1>
          <h2>Welcome {loggedInUser.name ?? "No Name"}</h2>
          <h2>{loggedInUser.email ?? "No Email"}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

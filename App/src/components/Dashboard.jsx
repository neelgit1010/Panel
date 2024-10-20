import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState({
    name: "",
    email: "",
  });
  const [products, setProducts] = useState([]);

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
        toast.error("Session expired, please login again", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/");
      }
      const response = await axios.get(
        "https://panel-api-server.vercel.app/product",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = response.data;
      if (!data) {
        throw new Error("No data found in response");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized, please login again", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log("Unauthorized, please login again");
      }
    }
  };

  const handleChange = (e) => {
    setProducts({
      ...products,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { title, description, price } = products;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expired, please login again", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    const response = await axios.post(
      "https://panel-api-server.vercel.app/userData",
      {
        title,
        description,
        price,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    console.log(response.data);
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
          <div>
            <form method="post" onSubmit={handleFormSubmit}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Enter Name"
              />
              <label htmlFor="desc">Description</label>
              <textarea
                name="description"
                id="description"
                onChange={handleChange}
              ></textarea>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                placeholder="Enter Price"
                onChange={handleChange}
              />

              <button type="submit">Add Info</button>
            </form>
          </div>
          <h2>Welcome {loggedInUser.name ?? "No Name"}</h2>
          <h2>{loggedInUser.email ?? "No Email"}</h2>
          <Outlet />
          <h2>Product List</h2>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                {product.title} - ${product.price} - ${product.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

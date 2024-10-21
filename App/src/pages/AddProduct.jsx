import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProductPage = () => {
  const [products, setProducts] = useState({});

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
      toast.error("Session expired, please login again", { /* options */ });
      return;
    }
    await axios.post(
      "https://panel-api-server.vercel.app/userData",
      { title, description, price },
      { headers: { Authorization: token } }
    );
    toast.success("Product added successfully!");
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form method="post" onSubmit={handleFormSubmit}>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" onChange={handleChange} placeholder="Enter Name" />
        <label htmlFor="desc">Description</label>
        <textarea name="description" onChange={handleChange}></textarea>
        <label htmlFor="price">Price</label>
        <input type="number" name="price" onChange={handleChange} />
        <button type="submit">Add Info</button>
      </form>
    </div>
  );
};

export default AddProductPage;

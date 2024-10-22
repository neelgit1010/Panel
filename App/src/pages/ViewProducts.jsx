import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ViewProductsPage = () => {
  const [viewProducts, setViewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Session expired, please login again", { /* options */ });
      return;
    }
    const response = await axios.get(
      "http://localhost:5000/product",
      { headers: { Authorization: token } }
    );
    const data = response.data;
    if (data) {
      setViewProducts(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    );
  }


  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {viewProducts.map((product, index) => (
          <li key={index}>
            {product.title} - ${product.price} - {product.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewProductsPage;

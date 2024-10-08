import { Link } from "react-router-dom";

const Submenu = ({ items }) => {
    if (!items || items.length === 0) return null; // Early return if items are not valid
  
    return (
      <div
        className="submenu"
        style={{
          width: "200px",
          height: "auto",
          color: "white",
          fontSize: "13.5px",
          transition: "all 1s ease",
          marginLeft: "30px",
        }}
      >
        <ul className="list-unstyled">
          {items.map((subItem, index) => (
            <li key={index}>
              <Link to={subItem.link} className="link-warning d-inline-flex text-decoration-none rounded text-white">
                {subItem.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Submenu;
  
import React from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import iconer from "./mallghar.png";
import shopping from "./shopping.png";

const Navbar = () => {
  const lengthItems = useSelector((state) => state.cartDetail.value);
  console.log(`lengthItems`, lengthItems);
  return (
    <div className="navbar">
      <div className="nav_box">
        <span className="my_shop">

          {/* page name and logo  */}
          <Link to={`/`} className="page-head" style={{ color: "white", textDecoration: "none" }}>
            <img className="iconer" src={iconer} alt=""/>
            MallGhar
          </Link>

          {/* Add product button  */}
          <Link to={`/addProduct`} style={{ textDecoration: "none" }}>
            <span className="mx-5 text-white styler" style={{ fontSize: "15px" }}>
              Add a Product
            </span>
          </Link>
        </span>

        {/* Cart icon with item count  */}
        <div className="cart">
          <Link to={`/Cart`} style={{ textDecoration: "none" }}>
            <span>
              <img className="shopping" src={shopping} alt=""/>
            </span>
            <span>{lengthItems?.length}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

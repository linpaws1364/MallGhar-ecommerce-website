import React, { useState, useEffect } from "react";
import "../styles/cart.css";
import { useSelector, useDispatch } from "react-redux";
import { removeCartItem } from "./../Redux/CartSlice"
import trash from "./trash.png";
 
// main function for checkout cart 
const Cart = () => {
  const dispatch = useDispatch()
  const [price, setPrice] = useState(0);
  const [currentItems, setCurrentItems] = useState();
  const lengthItems = useSelector((state) => state.cartDetail.value);

  // function for removing items from cart 
  const handleRemove = (e, item) => {
    dispatch(removeCartItem(item))
    setCurrentItems(lengthItems);
  };

  // function for handling the price of item in cart 
  const handlePrice = () => {
    let ans = 0;
    lengthItems?.map((item) => ans += item.price);
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
    setCurrentItems(lengthItems);

  }, [lengthItems]);

  return (
    <article>
      {currentItems?.map((item) => (
        <div className="cart_box" key={item.id}>
          {/* div for cart item image and details  */}
          <div className="cart_img">
            <img src={item.thumbnail} alt="" />
            <p>{item.title}</p>
          </div>

          {/* div for item price and remove button  */}
          <div>
            <span>{'Price : ' + item.price}</span>
            <button className="d-flex buttony" onClick={(e) => handleRemove(e, item)}><img className="trash" src={trash} alt=""/>Remove</button>
          </div>
        </div>
      ))}
      {/* div for displaying total price of items for checkout  */}
      <div className="text-dark d-flex justify-content-between">
        <h3 className="totally">Total Price</h3>
        <span className="pricey">Rs - {price}</span>
      </div>
    </article>
  );
};

export default Cart;

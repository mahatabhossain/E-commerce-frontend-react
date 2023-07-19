import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Cart";
import { clearCart, calculateTotalCost } from "../../features/cart/cartSlice";
import './cart.css'

const CartContiner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quantity, total, cartItems } = useSelector((store) => store.cart);
  const shopNow = () => navigate("/");


  useEffect(()=> {
    dispatch(calculateTotalCost())
  }, [cartItems])

  if (quantity < 1) {
    return (
      <div>
        <h2>Cart items</h2>
        <h3>Your cart is empty</h3>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={shopNow}
        >
          Shop Now
        </button>
      </div>
    );
  }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <h2>Cart items</h2>
        {cartItems && cartItems.map((item) => <Cart key={item.id} {...item} />)}
        <div className="cart_btn_container">
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              dispatch(clearCart());
            }}
          >
            Clear Cart
          </button>
          <div className="place_order_container">
            <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Place Order</button>
            <p className="total_amount">${total}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartContiner;

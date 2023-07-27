import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./Cart";
import { clearCart, calculateTotalCost, clearCartsItems } from "../../features/cart/cartSlice";
import './cart.css'
// import productContext from '../../context/ProductContext'


const CartContiner = () => {
  const navigate = useNavigate();
  const shopNow = () => navigate("/");
  const dispatch = useDispatch();

  const { quantity, total, cartItems } = useSelector((store) => store.cart);
  
  // const { productData } = useContext(productContext)

  // const userItem = cartItems.map(item => {
  //   const productId = item.productId
  //   return productData.find(product => product._id === productId )
  // })

  // console.log("CartItem", cartItems)
  // console.log("UserItem", userItem)

  // const getAmount = productData.map(item => {
  //   if(item?._id) return  cartItems.find(el => el.productId == item._id)
  //   }).filter(el => el)
    // console.log('AMOUNT', getAmount[0].amount)


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
      <div class="flex flex-col text-center w-full">
          <h3 class="sm:text-3xl text-2xl font-smalltitle-font mb-4 text-gray-900">
            Order summary
          </h3>
        </div>
        {cartItems && cartItems.map((item , i) => <Cart key={`item${i}`} {...item} /> )}
        <div className="cart_btn_container">
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => { dispatch(clearCartsItems()) }}
          >
            Clear Cart
          </button>
          <div className="place_order_container">
            <Link to="/checkout"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Checkout</Link>
            <p className="total_amount">${total}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartContiner;

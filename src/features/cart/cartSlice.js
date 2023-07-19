import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import axios from "axios";

const initialState = {
  cartItems: [],
  quantity: 1,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload
      state.cartItems = payload
    },
    addQuantity: (state, action) => {
        const itemId = action.payload
        console.log(itemId)
        const cartItem = state.cartItems.find(item => item._id === itemId)
        
        console.log("increased", cartItem);
        cartItem.amount = cartItem.amount + 1;
    },
    removeQuantity: (state, action) => {
        const itemId = action.payload
        const cartItem = state.cartItems.find((item) => item._id === itemId)
        cartItem.amount = cartItem.amount - 1
        console.log('decresed')
    },
    removeItem: (state, action) => {
        const itemId = action.payload
        console.log(itemId)
        const cartItem = state.cartItems.filter((item) => item._id !== itemId)
        state.cartItems = cartItem
        console.log('item removed')
    },
    calculateTotalCost: (state, action) => {
      let amount = 0
      let total = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        total += item.productPrice * item.amount
      })
      state.quantity = amount
      state.total = total
      console.log('Totoal price')
    },
    clearCart: (state) => {
      console.log("Cart clear")
      state.cartItems = []
  },
  },
});

export const addCart = () => {
  return async (dispatch) => {
    console.log('ADD TO CART CALLED')
    const userId = localStorage.getItem('userId')
    const productId = localStorage.getItem('productId')
    const res =await axios.post(`${process.env.REACT_APP_ENDPOINT}/add/cart`, {userId,productId })
    console.log('ADDED TO CART', res.data.userDetails.cart)
    dispatch(addToCart(res.data.userDetails.cart))
    
  }
}

export const viewCart = () => {
  return async (dispatch) => {
    const userId = localStorage.getItem('userId')
    console.log("View product called", userId)
    const res = await axios.get(`${process.env.REACT_APP_ENDPOINT}/get/cart/${userId}`)
    console("USERS CART ITEMS", res)
  }
}

export const {
  addToCart,
  addQuantity, 
  removeQuantity, 
  clearCart, 
  removeItem,
  calculateTotalCost,
 } = cartSlice.actions;
export default cartSlice.reducer;

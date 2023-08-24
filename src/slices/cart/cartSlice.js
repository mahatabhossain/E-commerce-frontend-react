import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";
import axios from "axios";

const initialState = {
  cartItems: [],
  quantity: 0,
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
      console.log("ITEM ID", itemId)
      const cartItem = state.cartItems.find(item => item.productId === itemId)
      console.log("increased", cartItem);
      cartItem.amount = cartItem.amount + 1;
    },
    removeQuantity: (state, action) => {
      const itemId = action.payload
      const cartItem = state.cartItems.find((item) => item.productId === itemId)
      cartItem.amount = cartItem.amount - 1
      console.log('decresed')
    },
    removeItem: (state, action) => {
      const productId = action.payload
      console.log("From action", productId)
      const cartItem = state.cartItems.filter((item) => item.productId !== productId)
      state.cartItems = cartItem
      console.log('item removed')
    },
    calculateTotalCost: (state, action) => {
      let amount = 0
      let total = 0
      state.cartItems?.forEach((item) => {
        if (item.amount && item?.price) {
          amount += item.amount
          total += +item.price * item.amount
        }
      })
      state.quantity = amount
      state.total = total
      console.log('Totoal price', amount, total)
    },
    clearCart: (state) => {
      console.log("Cart clear")
      state.cartItems = []
    },
  },
});

const userId = localStorage.getItem('userId')

export const addCart = () => {
  return async (dispatch) => {
    console.log('ADD TO CART CALLED')
    const productId = localStorage.getItem('productId')
    const res = await axios.post(`${process.env.REACT_APP_ENDPOINT}/add/cart`, { userId, productId })
    console.log('ADDED TO CART', res.data.userDetails.cart)

  }
}

export const viewCart = () => {
  return async (dispatch) => {
    console.log("View product called", userId)
    const res = await axios.get(`${process.env.REACT_APP_ENDPOINT}/get/cart/${userId}`)
    console.log("Cart item fetched", res.data.cartItems)
    dispatch(addToCart(res.data.cartItems))
  }
}

export const clearCartsItems = () => {
  return async (dispatch) => {
    try {
      console.log("CLEAR CART CLICKED", userId)
      const { updateCart } = await axios.delete(`${process.env.REACT_APP_ENDPOINT}/clear/cart/${userId}`)
      console.log("clear cart res", updateCart)
      dispatch(clearCart())
    } catch (e) {
      console.log(e)
    }
  }
}

export const removeCartItem = (userId, productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_ENDPOINT}/delete/item?userId=${userId}&productId=${productId}`)
      dispatch(cartSlice.actions.removeItem(productId))
    } catch (e) {
      console.log(e)
    }
  }
}

export const increaseItem = (userId, productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_ENDPOINT}/increase/item?userId=${userId}&productId=${productId}`)
      console.log("PRODUCT INCREASED", res)
      dispatch(cartSlice.actions.addQuantity(productId))
    } catch (e) {
      console.log(e)
    }
  }
}

export const decreaseItem = (userId, productId) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_ENDPOINT}/decrease/item?userId=${userId}&productId=${productId}`)
      console.log("PRODUCT DECREASED", res)
      dispatch(cartSlice.actions.removeQuantity(productId))
    } catch (e) {
      console.log(e)
    }
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

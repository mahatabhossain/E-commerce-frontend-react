import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orderedItemOfUser: [],
    paymentHistory: {},
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderedItems: (state, action) => {
            console.log('Payload', action.payload)
            state.orderedItemOfUser = action.payload.orderItems
            state.paymentHistory = action.payload.paymentHistory
        }
    }
})

export const orderedItems = (userId) => {
    return async (dispatch) => {
        const {data: {orders}} = await axios.get(`${process.env.REACT_APP_ENDPOINT}/get/all/orders/${userId}`)
        console.log('ORDERS', orders)
        dispatch(orderSlice.actions.setOrderedItems({ 'orderItems': orders[0].orderedItem, 'paymentHistory': orders[0].paymentHistory}))
    }
}

export default orderSlice.reducer;
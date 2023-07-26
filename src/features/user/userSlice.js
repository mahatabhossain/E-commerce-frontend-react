import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: {},
    address: []

}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setUser: (state, action) => {

        },
        setAddress: (state, action) => {
            state.address = action.payload
        },
    }
})

export const saveAddress = (userId, addressInput, setAddressForm) => {
    return async (dispath) => {
        console.log("SAVE ADDRESS CALLED", userId, addressInput)
        const {data:{userDetails:{address}}} = await axios.post(`${process.env.REACT_APP_ENDPOINT}/add/user/address/${userId}`, addressInput)
        console.log("ADDRESS RESPONSE", address)
        // dispath(userSlice.actions.setAddress(address))
        setAddressForm(false)
    }
}

export const getUserAddress = (userId) => {
    return async (dispath) => {
        const {data: {address}} = await axios.get(`${process.env.REACT_APP_ENDPOINT}/get/user/address/${userId}`)
        dispath(userSlice.actions.setAddress(address))
    }
}


export default userSlice.reducer
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";
import { addQuantity, removeQuantity, removeItem, clearCart } from "../../features/cart/cartSlice";


  const Cart = ({ _id, url, productName, productPrice,productDescription, amount }) => {
  const dispatch = useDispatch();
  const { quantiry } = useSelector((store) => store.cart);

  return (
    <div>
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap -m-4">
          <div className="lg:w-1/2">
            <div className="flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
              <img
                alt={productName}
                className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                src={url}
              />
              <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">
                  {productName}
                </h2>
                <h3 className="text-gray-500 mb-3">${productPrice}</h3>
                <p className="mb-4">
                  {productDescription}
                </p>
                <div className="flex justify-between">
                    <div>
                <AddIcon
                  onClick={() => {
                    dispatch(addQuantity(_id));
                  }}
                />
                {amount}
                <RemoveIcon
                  onClick={() => {
                    if(amount < 1){
                      dispatch(removeItem(_id))
                    }
                    if(quantiry < 1){
                      dispatch(clearCart())
                    }
                    dispatch(removeQuantity(_id));
                  }}
                />
                </div>
                <p onClick={()=> {
                  dispatch(removeItem(_id))}}>Remove</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Cart;

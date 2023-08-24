import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const Checkout = () => {
  const [product, setProduct] = useState({});
  const { address } = useSelector((store) => store.user);
  const { cartItems, total } = useSelector((store) => store.cart);


  const productId = localStorage.getItem("checkedOutId");

  const getChechedOutProduct = async (productId) => {
    const product = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}/get/product/${productId}`
    );
    if (product) {
      setProduct(product.data.product);
    }
  };

  console.log(product, "CHECKOUT PAGE", address, cartItems);


  const paymentHandler = async (e) => {
    e.preventDefault();

    console.log("Payment handlar called", localStorage.getItem('userId'), product.productPrice)
    
    const response = await axios.post(
      `${process.env.REACT_APP_ENDPOINT}/place/order/${localStorage.getItem('userId')}`,
      product.productPrice
    );

    // const response = await axios.get(
    //   `${process.env.REACT_APP_ENDPOINT}/create/order`
    // );

    const { data } = response;
    console.log("PAYMENT RESPONSE", response);

    const options = {
      key: process.env.RAZOR_PAY_KEY_ID,
      name: "e-Zone Pvt Ltd",
      description: "Some Description",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const captureResponse = await axios.post(
            `${process.env.REACT_APP_ENDPOINT}capture/payment/${paymentId}`,
            {}
          );
          console.log("CAPTURE RESPONSE", captureResponse);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    getChechedOutProduct(productId);
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-6 mx-auto">
        <div className="flex flex-col ">
          <h1 className="sm:text-3xl text-2xl font-small title-font mb-4 text-gray-900">
            Order summary
          </h1>
        </div>
        <div className="flex justify-center">
          <div className="p-2 lg:w-1/3 md:w-1/2 ">
            <div className="border-gray-200 border p-4 rounded-lg">
              <h3 className="text-gray-900 title-font py-2 font-medium">
                Shipping address <span style={{ color: "green" }}>Change</span>
              </h3>
              <div className="flex justify-center">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="text-gray-500">Street</p>
                  <p className="text-gray-500">Mobile</p>
                  <p className="text-gray-500">PIN</p>
                  <p className="text-gray-500">Landmark</p>
                </div>
                <div>
                  <p className="text-gray-500">{address[0].fullName}</p>
                  <p className="text-gray-500">{address[0].street}</p>
                  <p className="text-gray-500">{address[0].mobile}</p>
                  <p className="text-gray-500">{address[0].pin}</p>
                  <p className="text-gray-500">{address[0].landmark}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            {cartItems.length > 0 ? (
              cartItems.map((el, i) => (
                <div key={`product${i}`} className="p-2 ">
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img
                      alt="team"
                      className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                      src={el.url}
                    />
                    <div className="">
                      <h3 className="text-gray-900 title-font font-medium">
                        {el.productName}
                      </h3>
                      <p className="text-gray-500">${el.price}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-2 ">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                  <img
                    alt="team"
                    className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                    src={product.url}
                  />
                  <div className="">
                    <h3 className="text-gray-900 title-font font-medium">
                      {product.productName}
                    </h3>
                    <p className="text-gray-500">${product.productPrice}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center align-center">
          <Button variant="contained" onClick={(e) => paymentHandler(e)}>
            Place order
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {cartItems.length > 0 ? (
            <h2>${total}</h2>
          ) : (
            <h2>${product.productPrice}</h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Checkout;

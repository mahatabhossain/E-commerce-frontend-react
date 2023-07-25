import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../../features/cart/cartSlice";

const ProductDesc = () => {
  const [product, setProduct] = useState([]);
  const dispatch = useDispatch();

  const productId = localStorage.getItem("productId");

  const getProductById = async (productId) => {
    const product = await axios.get(
      `${process.env.REACT_APP_ENDPOINT}/get/product/${productId}`
    );
    if (product) {
      setProduct(product.data.product);
    }
  };

  useEffect(() => {
    getProductById(productId);
  }, []);

  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              class="object-cover object-center rounded"
              alt="hero"
              src={product.url}
            />
          </div>
          <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              {product.productDescription}
            </h1>
            <p class="mb-8 leading-relaxed">{product.productName}</p>
            <p class="mb-8 leading-relaxed">{product.productPrice}</p>
            <div class="flex w-full md:justify-start justify-center items-end">
              <button
                class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={() => dispatch(addCart())}
              >
                Add to cart
              </button>{" "}
              &nbsp;
              <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDesc;

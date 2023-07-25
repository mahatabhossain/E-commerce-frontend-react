import React, { useEffect, useState } from "react";
import axios from "axios";
import productContext from "./ProductContext";

const ProductState = ({ children }) => {
  const SERVER_ENDPOINT = process.env.REACT_APP_ENDPOINT;
  const [productData, setProdcutData] = useState([]);

  const getAllproduct = async () => {
    const productDetails = await axios.get(`${SERVER_ENDPOINT}/get/product`)
    setProdcutData(productDetails.data.data)
    // console.log('FETCHED PRODUCT', productDetails.data.data)
  }

  console.log('FETCHED PRODUCT', productData)

  useEffect(()=> {
    getAllproduct()
  }, [])

  const productContextData = {
    productData,
  };

  return (
    <div>
      <productContext.Provider value={productContextData}>
        {children}
      </productContext.Provider>
    </div>
  );
};

export default ProductState;

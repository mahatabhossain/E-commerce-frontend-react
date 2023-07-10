import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import productContext from "../../context/ProductContext";
import helperContext from "../../context/HelperContext";


const Home = () => {
  const { productData } = useContext(productContext);
  const { searchInput } = useContext(helperContext)

  console.log("FROM HOME", searchInput)
  const navigate = useNavigate();
  
  const getProductDesc = (id) => {
    navigate('product/description')
    console.log('PRODUCT ID', id)
    localStorage.setItem('productId', id)
  }

  // const searchedOutput = productData.filter((el) => {

  // })

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {productData?.filter((el) => {
              if(!searchInput) return true
               return el.productName.toLowerCase().includes(searchInput.toLowerCase())

            }).length > 0?productData?.filter((el) => {
              if(!searchInput) return true
               return el.productName.toLowerCase().includes(searchInput.toLowerCase())
            }).map((el) => (
              <div className="xl:w-1/4 md:w-1/2 p-4" onClick={()=> getProductDesc(el._id)}>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <img
                    className="h-40 rounded w-full object-cover object-center mb-6"
                    src={el.url}
                    alt="content"
                  />
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                    {el.productName}
                  </h3>
                  <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                    {el.productPrice}
                  </h2>
                  <p className="leading-relaxed text-base">
                    {el.productDescription}
                  </p>
                </div>
              </div>
            )) : <p>No data found</p>
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React from "react";
import Button from "@mui/material/Button";

const Checkout = () => {
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-6 mx-auto">
        <div class="flex flex-col text-center w-full">
          <h1 class="sm:text-3xl text-2xl font-small title-font mb-4 text-gray-900">
            Order summary
          </h1>
        </div>

        <div class="flex flex-wrap">
          <div class="p-2 lg:w-1/3 md:w-1/2 ">
            <div class="h-full flex border-gray-200 border p-4 rounded-lg">
              <div class="flex-grow">
                <h3 class="text-gray-900 title-font font-medium">
                  Shipping address
                </h3>
                <p class="text-gray-500">QA Engineer</p>
              </div>
            </div>
          </div>

          <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
            <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
              <img
                alt="team"
                class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                src="https://dummyimage.com/104x94"
              />
              <div class="flex-grow">
                <h3 class="text-gray-900 title-font font-medium">
                  Product name
                </h3>
                <p class="text-gray-500">System</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center align-center">
          <Button variant="contained">Place order</Button> &nbsp;&nbsp;&nbsp;&nbsp;
          <p>Total price</p>
        </div>
      </div>
    </section>
  );
};

export default Checkout;

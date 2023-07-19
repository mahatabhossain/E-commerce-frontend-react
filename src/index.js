import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import UserState from "./context/UserState";
import HelperState from "./context/HelperState";
import ProductState from "./context/ProductState";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserState>
        <ProductState>
          <HelperState>
            <Provider store={store}>
              <App />
            </Provider>
          </HelperState>
        </ProductState>
      </UserState>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

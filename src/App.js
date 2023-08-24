import "./App.css";
import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import ForgotPass from "./pages/ForgotPass/ForgotPass";
import userContext from "./context/UserContext";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import BasicAlerts from "./components/Alert/BasicAlerts";
import CartContiner from "./components/Cart/CartContiner";
import Profile from "./pages/Profile/Profile";
import AccountSetting from "./pages/AccountSetting/AccountSetting";
import Payment from "./pages/Payment/Payment";
import Orders from "./pages/Orders/Orders";
import Logout from "./pages/Logout/Logout";
import DeleteAccount from "./pages/DeleteAccount/DeleteAccount";
import DownloadApp from "./pages/DownloadApp/DownloadApp";
import HelpCenter from "./pages/HelpCenter/HelpCenter";
import { Toolbar } from "@mui/material";
import Reducer from "./Reducers/Reducer";
import ProductDesc from "./components/ProductDesc/ProductDesc";
import Checkout from "./components/Checkout/Checkout";

// import Test from './pages/Timer/Test';

function App() {
  //Default time for logout
  const [expireTime, setExpireTime] = useState(10 * 1000 * 60);
  let timeOutId;

  //AUTO LOGOUT ON INACTIVE
  const autoLogout = () => {
    setExpireTime(5 * 1000 * 60);
    if (timeOutId != undefined) {
      clearTimeout(timeOutId);
    }
    //setTimeout and setInterval both returns an id
    timeOutId = setTimeout(() => {
      localStorage.removeItem("token");
    }, expireTime);
  };

  document.body.addEventListener("mousemove", autoLogout);

  const { alertRes, setLoginRes } = useContext(userContext);

  useEffect(() => {
    return () => {
      autoLogout();
      if (!localStorage.getItem("token")) {
        setLoginRes(null);
      }
    };
  }, [autoLogout]);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<Signup />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="/profile/account" element={<AccountSetting />} />
          <Route path="/profile/orders" element={<Orders />} />
          <Route path="/profile/payment" element={<Payment />} />
          <Route path="/profile/delete/account" element={<DeleteAccount />} />
          <Route path="/profile/help/center" element={<HelpCenter />} />
          <Route path="/profile/logout" element={<Logout />} />
        </Route>
        <Route path="/forgot/password" element={<ForgotPass />} />
        <Route path="/cart" element={<CartContiner />} />
        <Route path="/download/app" element={<DownloadApp />} />
        <Route path="/help/center" element={<HelpCenter />} />
        <Route path="/product/description" element={<ProductDesc />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path="/reducer/example" element={<Reducer />} />
      </Routes>
      {alertRes.showAlert && <BasicAlerts response={alertRes} />}
      <Toolbar />
      <Footer />
    </div>
  );
}

export default App;

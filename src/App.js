import './App.css';
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import TestOne from './components/TestOne/TestOne';
import TestTwo from './components/TestTwo/TestTwo';
import TestThree from './components/TestThree/TestThree';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ForgotPass from './pages/ForgotPass/ForgotPass';
import userContext from './context/UserContext';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import BasicAlerts from './components/Alert/BasicAlerts';
import Profile from './pages/Profile/Profile';
import VendorSignup from './pages/VendorSignup/VendorSignup';

function App() {
const {
  alertRes,
} = useContext(userContext);

  return (
      <div className="App">
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/test_one' element={<TestOne />} />
            <Route path='/test_two' element={<TestTwo />} />
            <Route path='/test_three' element={<TestThree />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign_up' element={<Signup/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/forgot_password' element={<ForgotPass />}/>
            <Route path='/vendor/signup' element={<VendorSignup />} />
          </Routes>
          {alertRes.showAlert&&<BasicAlerts response = {alertRes}/>}
          <Footer />
      </div>
  );
}


export default App;

import './App.css';
import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ForgotPass from './pages/ForgotPass/ForgotPass';
import userContext from './context/UserContext';
import Home from './pages/Home';
import Footer from './components/Footer/Footer';
import BasicAlerts from './components/Alert/BasicAlerts';
import Profile from './pages/Profile/Profile';
import Cart from './components/Cart/Cart';


function App() {
const {
  alertRes,
} = useContext(userContext);

  return (
      <div className="App">
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign_up' element={<Signup/>} />
            <Route path='/profile' element={<Profile/>} />
            <Route path='/forgot_password' element={<ForgotPass />}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
          {alertRes.showAlert&&<BasicAlerts response = {alertRes}/>}
          <Footer />
      </div>
  );
}

export default App;

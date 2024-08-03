import HomePage from './pages/HomePage';
import Buy from './pages/Buy'
import Login from './components/Login'
import SignUp from './components/SignUp'
import AboutUs from './pages/AboutUs'
import Sell from "./pages/Sell";
import Description from './components/Description';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Checkout from './components/Checkout';
import Paymentwithcard from './components/Paymentwithcard';
import ContactUs from './pages/ContactUs';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Processing from './components/Processing';
import Admin from "./pages/Admin" ;


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/description' element={<Description/>} />
        <Route path='/buy' element={<Buy/>} />
        <Route path ='/login' element= {<Login/>} />
        <Route path ='/signup' element= {<SignUp/>} />
        <Route path ='/aboutus' element= {<AboutUs/>} />
        <Route path ='/contactus' element= {<ContactUs/>} />
        <Route path ='/sell' element= {<Sell/>} />
        <Route path ='/cart' element= {<Cart/>} />
        <Route path='/footer' element={<Footer/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/processing' element={<Processing/>} />
        <Route path='/payment' element={<Paymentwithcard/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='*' element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  )
}
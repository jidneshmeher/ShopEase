import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./features/auth/authSlice";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";
import useAuth from "./features/auth/hooks/useAuth";
import { fetchCartThunk } from './features/cart/cartSlice';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Analytics } from '@vercel/analytics/react';

function App() {
  const dispatch = useDispatch();
  const {user} = useAuth();

  gsap.registerPlugin(ScrollTrigger);
  
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  useEffect(() => {
    if (user && user._id) {
      dispatch(fetchCartThunk());
    }
  }, [user, dispatch]);

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster position="top-right" />
      <Analytics />
    </>
  );
}

export default App;

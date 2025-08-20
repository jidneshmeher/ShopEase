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

function App() {
  const dispatch = useDispatch();
  const {user} = useAuth();

  gsap.registerPlugin(ScrollTrigger);
  
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  useEffect(() => {
    if (user && user.data?._id) {
      dispatch(fetchCartThunk());
    }
  }, [user, dispatch]);

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;

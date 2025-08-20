import { useRef } from "react";
import {Link} from "react-router-dom"
import heroImage from '../../../assets/images/hero.jpg';
import Typewriter from './Typewriter.jsx';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const headingRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    gsap.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: 0.8,
      ease: "power2.out",
    });
    gsap.from(buttonRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <section 
      className="relative w-full bg-black" 
      style={{ height: 'calc(100vh - 64px)' }}
      >
      <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)',
        }}
      />
      <h1
        className="absolute top-[23%] left-12 text-white text-[115px] leading-[130px] font-bold max-w-2xl tracking-wide"
        ref={headingRef}
      >
        Your Online 
        <br/>
        Store for
        <br/>
        <Typewriter words={[' Mobiles', ' Laptops', ' Headphones', ' Watches']} />
      </h1>
      {/* <p className="absolute top-[55%] left-12 text-white text-xl max-w-lg">
        Explore the best electronics and gadgets at unbeatable prices.
      </p> */}
      <Link
        to="/products"
        ref={buttonRef}
        className="absolute top-[72%] left-12 bg-blue-600 font-semibold text-lg text-white px-10 py-3 rounded-3xl hover:bg-blue-700"
      >
        Shop Now
      </Link>
    </section>
  );
};

export default Hero;

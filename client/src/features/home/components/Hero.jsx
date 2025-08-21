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
      <img src={heroImage} alt="Hero" className=" w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)',
        }}
      />
      <div 
        ref={headingRef} 
        className="absolute z-20 flex w-fit flex-col gap-4 text-left 
        bottom-4 left-4 lg:left-12 lg:top-1/2 md:-translate-y-1/2"
      >
        <div className="flex flex-col gap-0 max-md:items-start w-full max-w-full px-4 sm:px-6 md:px-12">
          <p className="m-0 overflow-hidden text-white text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[115px] leading-[1.1] font-playfair tracking-wide break-words whitespace-normal">
            <span className="block animate-appear-from-bottom">FIND</span>
          </p>
          <p className="m-0 overflow-hidden text-white text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[115px] leading-[1.1] font-playfair tracking-wide break-words whitespace-normal">
            <span className="block animate-appear-from-bottom">THE BEST</span>
          </p>
          <p className="m-0 overflow-hidden text-white text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[115px] leading-[1.1] font-playfair tracking-wide break-words whitespace-normal">
            <span className="block animate-appear-from-bottom">DEALS ON</span>
          </p>
          <p className="m-0 overflow-hidden text-white text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[115px] leading-[1.1] font-playfair tracking-wide min-w-[50%] sm:min-w-[60%] md:min-w-[80%] break-words whitespace-normal">
            <span className="block animate-appear-from-bottom">
              <Typewriter words={['MOBILES', 'LAPTOPS', 'HEADPHONES', 'WATCHES']} />
            </span>
          </p>
        </div>

      </div>

      {/* <Link
        to="/products"
        ref={buttonRef}
        className="absolute top-[72%] left-12 bg-blue-600 font-semibold text-lg text-white px-10 py-3 rounded-3xl hover:bg-blue-700"
      >
        Shop Now
      </Link> */}
    </section>
  );
};

export default Hero;

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Intro = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(containerRef.current.querySelectorAll("h1, h2, p"), {
      y: 70,
      opacity: 0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: ".intro-section",
        start: "top 80%",
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="intro-section bg-white text-black flex justify-center px-4 py-16 sm:py-20"
    >
      <div className="max-w-4xl text-center w-full">
        <h1 className="mb-2 font-playfair text-[clamp(32px,8vw,64px)]">
          SHOPEASE
        </h1>

        <h2 className="mb-4 text-[clamp(18px,5vw,32px)]">
          TECH THAT COMPLEMENTS EVERY MOMENT
        </h2>

        <p className="mb-6 leading-relaxed text-[clamp(14px,4vw,20px)]">
          “At ShopEase, we bring together a handpicked selection of gadgets that make life easier, smarter, and more connected. Whether you're tuning out the noise, catching up with friends, getting work done, or simply unwinding — there's something here for every moment of your day.”
        </p>

        <p className="text-[clamp(14px,4vw,20px)] font-medium">JIDNESH MEHER</p>
      </div>
    </section>
  );
};

export default Intro;

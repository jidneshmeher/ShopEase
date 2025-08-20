import { useRef } from "react";

import Hero from "../features/home/components/Hero";
import Intro from "../features/home/components/Intro";
import CategoryCard from "../features/home/components/CategoryCard";
import VideoSection from "../features/home/components/VideoSection";

import watchImage from "../assets/images/home/category-watch.jpg";
import headphoneImage from "../assets/images/home/category-headphone.jpg";
import mobileImage from "../assets/images/home/category-mobile.jpg";
import laptopImage from "../assets/images/home/category-laptop.jpg";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Home = () => {

  const categories = [
    {
      title: "Watches",
      subTitle: "Smart and stylish watches designed to keep you connected and always on time.",
      image: watchImage,
      link: "/products?category=watches",
    },
    {
      title: "Headphones",
      subTitle: "Experience immersive sound with headphones crafted for comfort, style, and high performance.",
      image: headphoneImage,
      link: "/products?category=headphones",
    },
    {
      title: "Mobile Phones",
      subTitle: "Discover the latest smartphones combining speed, sleek design, and smart technology.",
      image: mobileImage,
      link: "/products?category=mobiles",
    },
    {
      title: "Laptops",
      subTitle: "High-performance laptops built for work, entertainment, and creative pursuits anywhere.",
      image: laptopImage,
      link: "/products?category=laptops",
    },
  ];

  const headingRef = useRef(null);
  const container = useRef(null);

  useGSAP(() => {
    gsap.from(headingRef.current, {
      y: 70,
      opacity:0.2,
      duration: 0.8,
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
      },
    });
  }, []);

  useGSAP(() => {
    const cards = container.current.querySelectorAll(".card");
  
    cards.forEach((card, index) => {
      gsap.from(card, {
        x: index % 2 === 0 ? -500 : 500,
        opacity: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
      });
    });
  }, [], container);
  

  return (
    <>
      <Hero />
      <Intro />
      {/* <VideoSection/> */}
      <section className="py-20 px-6 w-auto mx-auto">
        <h2 ref={headingRef} className="text-[32px] font-playfair font-normal text-center">
          SHOP BY CATEGORY
        </h2>

        <div 
          className="grid gap-32 sm:grid-cols-2 py-20 overflow-hidden"
          ref={container}
        >
          {categories.map((cat, index) => (
            <div
              className="card"
              key={cat.title}
            >
              <CategoryCard
                title={cat.title}
                subTitle={cat.subTitle}
                image={cat.image}
                link={cat.link}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
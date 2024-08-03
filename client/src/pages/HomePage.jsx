import React from "react";
import Carousel from "../components/Carousel";
import NavBar from "../components/NavBar";
import laptop from "../assets/laptop.png"
import headphone from "../assets/headphone.png"
import watch from "../assets/watch.png"
import mobile from "../assets/mobile.png"
import CustomerReviews from "../components/CustomerReviews";
import Footer from "../components/Footer";
import '../App.css'
// import Watch from "../components/Watch";
// import Headphone from "../components/Headphone"
// import Mobile from "../components/Mobile"
// import Laptop from "../components/Laptop"
// import {Canvas} from "@react-three/fiber"
// import { OrbitControls } from "@react-three/drei";


export default function HomePage()
{
  const slides = [
    laptop,
    headphone,
    watch,
    mobile
  ]


    return(
      <>
      <NavBar/>

      <Carousel autoSlide={true}>
        {
          slides.map((e) =>(
            <img src={e} />
          ))
        }
      </Carousel>
      
      {/* Categories */}
      {/* <div className="container text-center mx-auto m-20 font-bold text-4xl text-black ">Categories</div> */}
        {/* <div className=" flex flex-col "> */}

        {/* <div class="p-6 border rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-20"> */}

        {/*
        <div className="m-20">
        <Canvas className="canva">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2,5,2]} intensity={1} />
        <Suspense fallback={null}>
          <Watch/>
        </Suspense>
      </Canvas>
        </div>

         <div className="m-20">
        <Canvas className="canvas">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2,5,2]} intensity={1} />
        <Suspense fallback={null}>
          <Headphone/>
        </Suspense>
      </Canvas>
        </div>
        <div className="m-20">
        <Canvas className="canvas">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2,5,2]} intensity={1} />
        <Suspense fallback={null}>
          <Laptop/>
        </Suspense>
      </Canvas>
        </div>
        <div className="m-20">
        <Canvas className="canvas">
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2,5,2]} intensity={1} />
        <Suspense fallback={null}>
          <Mobile/>
        </Suspense>
      </Canvas>
        </div> */}

        {/* </div> */}
        {/* </div> */}

      {/* New Arrivals */}
      <div className="container text-center mx-auto m-20 font-bold text-4xl text-black  ">New Arrivals</div>
      
      <div className=" 2xl:columns-4 m-20">

      <div class=" sm:mx-auto sm:m-20   max-w-sm bg-[white] border drop-shadow-lg  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 break-after-column " >
          <p>
              <img class="rounded-t-lg" src="/images/watches/watch1.png" alt="" />
          </p>
          <div class="p-5">
              <but>
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-[black] dark:text-white">Casio G-Shock DW5600E-1V</h5>
              </but>
              <p class="mb-3 font-normal text-gray-800  dark:text-gray-400">Elevate Your Style with Timeless Elegance: Discover Our Exquisite Collection of Watches</p>
          </div>
       </div>

      <div class=" sm:mx-auto sm:m-20 max-w-sm bg-[white] border drop-shadow-lg  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 break-after-column " >
          <p>
              <img class="rounded-t-lg" src="/images/headphones/headphone1.png" alt="" />
          </p>
          <div class="p-5">
              <p>
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-[black] dark:text-white">Sony WH-1000XM4</h5>
              </p>
              <p class="mb-3 font-normal text-gray-800   dark:text-gray-400">Immerse Yourself in Crystal-Clear Sound: Explore Our Range of Premium Headphones</p>
          </div>
       </div>

      <div class=" sm:mx-auto sm:m-20  max-w-sm bg-[white] border drop-shadow-lg  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 break-after-column " >
          <p>
              <img class="rounded-t-lg" src="/images/mobiles/mobile1.png" alt="" />
          </p>
          <div class=" p-5   ">
              <p>
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-[black] dark:text-white">Samsung Galaxy S21 Ultra</h5>
              </p>
              <p class="mb-3 font-normal text-gray-800   dark:text-gray-400">Stay Connected with the Latest Smartphone Technology: Discover Our Phone Collection</p>
          </div>
       </div>

      <div class=" sm:mx-auto sm:m-20 max-w-sm bg-[white] border drop-shadow-lg  rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 break-after-column " >
          <p>
              <img class="rounded-t-lg" src="/images/laptops/laptop1.png" alt="" />
          </p>
          <div class="p-5">
              <p>
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-[black] dark:text-white">Dell XPS 13</h5>
              </p>
              <p class="mb-3 font-normal text-gray-800   dark:text-gray-400">Elevate Your Productivity with Cutting-Edge Laptops: Explore Our Laptop Range</p>
          </div>
       </div>
      </div>
      <CustomerReviews/>
      <Footer/>
      </>
    );
}
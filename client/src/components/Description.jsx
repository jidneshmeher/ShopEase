import { useState,useEffect } from 'react'
import NavBar from './NavBar'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from "./Footer"


const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Description() {

  const nav = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [info,setInfo] = useState([""]);

  const email = sessionStorage.getItem('un')

  useEffect(() =>{
    if(location.search)
    {
    let urladd = "https://ecommerce-website-server-r98l.onrender.com/description";
        const id = searchParams.get('id');
        const select = searchParams.get('select');
        console.log(id ,select);
        let data = {id,select};
        axios.post(urladd,data)
        .then(res =>{
          setInfo(res.data);
        })
        .catch(err =>{ 
          console.log(err);
        });
      }
  },[location])

  const Add = () =>{
    if(email)
    {
    let urladd = "https://ecommerce-website-server-r98l.onrender.com/cart";
    const id = searchParams.get('id');
    const select = searchParams.get('select');
    let data = {id,select,email};
    axios.post(urladd,data)
    .then(res =>{
      setInfo(res.data);
    })
    .catch(err =>{ 
      console.log(err);
    });
    nav("/cart");
    }
    else
    {
      alert("Login First")
    }
  }

  console.log(info)

  return (
    <>
    <NavBar/>
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="container aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={info[0].imageSrc}
              alt={info[0].imageAlt}
              className=" 2xl:h-full w-full object-cover object-center"
            />
          </div>
        {/* Options */}
        <div className='lg:border-r  lg:border-gray-200'></div>
        <div className=" mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">Type: {info[0].type}</p>
            <br/>
            <p className="text-3xl tracking-tight text-gray-900">Color: {info[0].color}</p>
            <br/>
            <p className="text-3xl tracking-tight text-gray-900">Price: ₹{info[0].price}</p>
              <button className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={Add}>Add to bag</button>
              <button className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => { if(email) nav("/checkout",{state:{"info":info}}); else alert("Login First") } }>Buy Now</button>
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          
          <div className="lg:col-span-2 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{info[0].name}</h1>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h1 className=" text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl sr-only">Description</h1>
              <div className="space-y-6">
                <p className="text-base text-gray-950">{info[0].description}</p>
              </div>
            </div>

            <div className=" mt-10 transition border-t border-gray-200 pt-10  ">
              <h1 className="text-2xl  font-bold tracking-tight text-gray-900 sm:text-2xl">Highlights</h1>

              <div className="mt-4" >
                      <pre className='font-sans text-base whitespace-pre-wrap'><p className="text-black">{info[0].highlights}</p></pre>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10 ">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">Details</h1>

              <div className="mt-4 space-y-6">
                <pre><p className=" font-sans text-base text-gray-950 whitespace-pre-wrap ">{info[0].details}</p></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  )
}

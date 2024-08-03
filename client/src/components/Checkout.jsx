import { useState,useRef,useEffect } from "react";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import Paymentwithcard from "./Paymentwithcard";
import Processing from "./Processing";
import axios from "axios";

export default function Checkout()
{
  const location = useLocation();
  const [payment,setPayment] = useState(true);
  const [shipping,setShipping] = useState(true);
  const [name,setName] = useState("");
  const [address,setAddress] = useState("");
  const [city,setCity] = useState("");
  const [state,setState] = useState("");
  const [zip,setZip] = useState("");
  const [country,setCountry] = useState("");
  const [phonenumber,setPhonenumber] = useState("");
  const [details,setDetails] = useState(true);
  const [card,setCard] = useState(false);
  const [cash,setCash] = useState(false);
  const [order,setOrder] = useState(false);
  const [session,setSession] = useState();

  const ref = useRef();
  const radio_btn = useRef();
  

  const hPayment = (event) =>{
    if(event.target.checked)
    {
      setPayment(false);
    }
    else{
      setPayment(true);
    }
  }

  const hShipping = (event) =>{
    setShipping(false);
  }

  const hName = (event) =>{
    setName(event.target.value);
  }

  const hAddress = (event) =>{
    setAddress(event.target.value);
  }

  const hCity = (event) =>{
    setCity(event.target.value);
  }

  const hState = (event) =>{
    setState(event.target.value);
  }

  const hZip = (event) =>{
    setZip(event.target.value);
  }

  const hCountry = (event) =>{
    setCountry(event.target.value);
  }

  const hPhonenumber = (event) =>{
    // console.log("phonenumber" , (event.target.value).length);
    setPhonenumber(event.target.value);
  }

  const hCard = (event) =>{
    setCash(false);
    setCard(true);
  }

  const hCash = (event) =>{
    setCash(true);
  }

  const hDetails = (event) => {
    const phoneNumberValue = ref.current.value
    // console.log(phoneNumberValue)
    if(name != "" && address != "" && city!= "" && state!= "" && zip!= "" && country !="" && phoneNumberValue!= "" && phoneNumberValue.length === 10 )
    {
    setDetails(false);
    }
    else{
      setDetails(true);
    }
  }

  const hClose = () =>{
    setCard(false); 
    radio_btn.current.checked = false ;
  }

    // payment integration

  const Order = () =>{
    setOrder(true);
    // const stripe = loadStripe("pk_test_51O7nVASDSZiTnCr2CEvKSc71dN6mpMtMfSTO6KncPaC0EH1BQfzi0KbUJWNITckX1doVOEXDoFPP9VYZo0FDJrCq00qxgxTVd5");

    // const body = {
    //     products:carts
    // }
    // const headers = {
    //     "Content-Type":"application/json"
    // }
    // const response = await fetch("http://localhost:7000/api/create-checkout-session",{
    //     method:"POST",
    //     headers:headers,
    //     body:JSON.stringify(body)
    // });

    // let urladd = "http://localhost:9000/checkout";
    //     let data = {products:location.state.info};
    //     axios.post(urladd,data)
    //     .then(res =>{
    //       setSession(res.data);
    //       const result = stripe.redirectToCheckout({
    //         sessionId:session.id
    //     });
        
    //     if(result.error){
    //         console.log(result.error);
    //     }
    //     })
    //     .catch(err =>{ 
    //       console.log(err);
    //     });
  }

  useEffect(() => {
    if(order)
    {
    const timeout = setTimeout(() => {
      setOrder(false);
    }, 5000);
    return () => clearTimeout(timeout);

  }
  
  }, [order]);


    return(
        <>

        <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32 sticky top-0 z-50">
          <a className="text-2xl font-bold text-gray-800">Digital Hub</a>
          <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
            <div className="relative">
              <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <button className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                    ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg
                  ></button>
                  <span className="font-semibold text-gray-900">Shop</span>
                </li>

                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>

                {shipping ? <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <button className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">2</button>
                  <span className="font-semibold text-gray-900">Shipping</span>
                </li>: 
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                 <button className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                    ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg
                  ></button>
                  <span className="font-semibold text-gray-900">Shipping</span>
                </li>}

                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>

                {name == "" || address== "" || city== "" || state== "" || zip== "" || country=="" || phonenumber== "" || phonenumber.length != 10  ? <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <button className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">3</button>
                  <span className="font-semibold text-gray-900">Details</span>
                </li>:  
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                 <button className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                    ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg
                  ></button>
                  <span className="font-semibold text-gray-900">Details</span>
                </li>
                }

                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                
                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                  <button className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">4</button>
                  <span className="font-semibold text-gray-500">Payment</span>
                </li>

              </ul>
            </div>
          </div>
        </div>

        <div className="grid sm:px-10 lg:grid lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>

            {
              location.state.info.map((e) =>(
                <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                  <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={e.imageSrc} alt={e.imageAlt} />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{e.name}</span>
                    <p className="text-lg font-bold">₹{e.price}</p>
                  </div>
                </div>
              </div>
              )              
              )
            }


            <p className="mt-8 text-lg font-medium">Shipping Methods</p>
            <form className="mt-5 grid gap-6">
              <div className="relative">
                <input className="peer hidden" id="radio_1" type="radio" name="radio" onClick={hShipping} />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
                  <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Normal Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">Delivery: 5-10 Days</p>
                  </div>
                </label>
              </div>
              <div className="relative">
                <input className="peer hidden" id="radio_2" type="radio" name="radio" onClick={hShipping} />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
                  <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Fast Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                  </div>
                </label>
              </div>
            </form>
          </div>

          <p className="mt-8 text-lg font-medium px-4">Delivery Details</p>
          <div class="mt-8 ml-3 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <form method="POST" action="https://herotofu.com/start" enctype="multipart/form-data" onChange={hDetails}>
              <label class="block mb-6">
                <span class="text-gray-700">Your name</span>
                <input name="name" type="text" class="block w-full mt-2 focus:outline-none border-b border-gray-300 bg-white  " placeholder="" onChange={hName} disabled={shipping} />
              </label>
              <label class="block mb-6">
                <span class="text-gray-700">Address</span>
                <input
                  name="address1"
                  type="text"
                  class="
                    block
                    w-full
                    mt-1
                    focus:outline-none border-b border-gray-300
                    bg-white 
                  "
                  placeholder=""
                  onChange={hAddress}
                  disabled={shipping}
                />
              </label>

              <label class="block mb-6">
                <span class="text-gray-700">City</span>
                <input
                  name="city"
                  type="text"
                  class="
                    block
                    w-full
                    mt-1
                    focus:outline-none border-b border-gray-300
                    bg-white 
                  "
                  onChange={hCity}
                  disabled={shipping}
                  placeholder=""
                />
              </label>
              <label class="block mb-6">
                <span class="text-gray-700">State/Province</span>
                <input
                  name="state"
                  type="text"
                  class="
                    block
                    w-full
                    mt-1
                    focus:outline-none border-b border-gray-300
                    bg-white 
                  "
                  placeholder=""
                  onChange={hState}
                  disabled={shipping}
                />
              </label>
              <label class="block mb-6">
                <span class="text-gray-700">Zip/Postal code</span>
                <input
                  name="zip"
                  type="text"
                  class="
                    block
                    w-full
                    mt-1
                    focus:outline-none border-b border-gray-300
                    bg-white 
                  "
                  placeholder=""
                  onChange={hZip}
                  disabled={shipping}
                />
              </label>
              <label class="block mb-6">
                <span class="text-gray-700">Country</span>
                <input
                  name="country"
                  type="text"
                  class="
                    block
                    w-full
                    mt-1
                    focus:outline-none border-b border-gray-300
                    bg-white 
                  "
                  placeholder=""
                  onChange={hCountry}
                  disabled={shipping}
                />
              </label>
              <label class="block mb-6">
                <span class="text-gray-700">Phone Number</span>
                <input
                  name="telephone"
                  type="text"
                  class="
                    block
                    w-full
                    mt-1
                    focus:outline-none border-b border-gray-300
                    bg-white 
                  "
                  placeholder=""
                  onChange={hPhonenumber}
                  ref = {ref}
                  disabled={shipping}
                />
              </label>
              <div>
              </div>
            </form>
          </div>

          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-20">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">Complete your order by providing your payment details.</p>
            <div class="flex items-center mb-4 my-10">
                <input id="default-radio-1" type="radio" onChange={hPayment} value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600" disabled={details} onClick={hCash} />
                <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cash on Delivery</label>
            </div>
            <div class="flex items-center mb-4 my-10">
                <input id="default-radio-2" type="radio" onChange={hPayment} value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" disabled={details} onClick={hCard}  ref={radio_btn} />
                <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Card</label>
            </div>
            {/* <div class="flex items-center mb-4 my-10">
                <input id="default-radio-3" type="radio" onChange={hPayment} value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600" disabled={details} />
                <label for="default-radio-3" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">GPay</label>
            </div> */}
            { cash ?  <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white" disabled={payment} onClick={Order}>Place Order</button>:null }
            <Paymentwithcard Close={hClose} visible={card} />
            <Processing visible={order} />
          </div>
        </div>
        <Footer/>
        </>
    );
}
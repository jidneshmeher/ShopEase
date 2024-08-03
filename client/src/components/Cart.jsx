import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const ref = useRef("");
    const [info,setInfo] = useState([""]);
    const [subtotal,setSubtotal] = useState(0);
    const nav = useNavigate("");
    
    const email = sessionStorage.getItem('un')


    useEffect (()=>{
        let urladd = "https://ecommerce-website-server-r98l.onrender.com/get"
        let data = {email}
        axios.post(urladd,data)
        .then(res =>{setInfo(res.data);})
        .catch(err =>console.log(err));
      },[]);


    useEffect(()=>{
        if(info[0])
        {
        let st = 0;
        info.map((e) =>(
            st = (st + parseInt((e.price).replace(/,/g,"")))
        ))
        setSubtotal(st);
        }
    },[info])

    
    const Remove = (event) =>{
        let urladd = "https://ecommerce-website-server-r98l.onrender.com/delete";
        let name = event.target.id ;
        let d = {data:{name,email}}
        axios.delete(urladd,d)
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.log("del issue "+err));
    }

    return (
        <>
        <div>
        <div className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
            <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                <div className="flex md:flex-row flex-col justify-end" id="cart">
                    <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden 2xl:h-screen" id="scroll">
                        {info.map((e,i) => (
                            <div className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                            <div className="w-1/4">
                                <img src={e.imageSrc} alt className="w-full h-full object-center object-cover" />
                            </div>
                            <div className="md:pl-3 md:w-3/4">
                                <div className="flex items-center justify-between w-full pt-1">
                                    <p className="text-base font-black leading-none text-gray-800">{e.name}</p>
                                    <select id={i} className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none" ref={ref}>
                                        <option value={1}>01</option>
                                        <option value={2}>02</option>
                                        <option value={3}>03</option>
                                    </select>
                                </div>
                                <p className="text-xs leading-3 text-gray-600 pt-2">Type: {e.type}</p>
                                <p className="text-xs leading-3 text-gray-600 py-4">Color:{e.color}</p>
                                <p className="w-96 text-xs leading-3 text-gray-600">Warranty: {e.warranty}</p>
                                <div className="flex items-center justify-between pt-5 pr-6">
                                    <div className="flex itemms-center">
                                        <button value={e.id} id={e.name} className="text-xs leading-3 underline text-red-500 cursor-pointer" onClick={Remove}>Remove</button>
                                    </div>
                                    {e.price ? <p id={i} className="text-base font-black leading-none text-gray-800" >₹{ parseInt((e.price).replace(/,/g,"")) }</p>:null}
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className=" md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                        <div className="flex flex-col sm:h-screen px-14 py-20 justify-between overflow-y-auto">
                            <div>
                                <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                                <div className="flex items-center justify-between pt-16">
                                    <p className="text-base leading-none text-gray-800">Subtotal</p>
                                    <p className="text-base leading-none text-gray-800">₹{subtotal.toLocaleString()}</p>
                                </div>
                                <div className="flex items-center justify-between pt-5">
                                    <p className="text-base leading-none text-gray-800">Shipping</p>
                                    <p className="text-base leading-none text-gray-800">₹150</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                    <p className="text-2xl leading-normal text-gray-800">Total</p>
                                    <p className="text-2xl font-bold leading-normal text-right text-gray-800">₹{(subtotal+150).toLocaleString()}</p>
                                </div>
                                <button onClick={() => {nav("/checkout",{state:{"info":info}}) }} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    );
}


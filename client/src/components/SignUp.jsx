import { useState } from "react";
import axios from "axios"
import {auth} from "./Firebase"
import Otp from "./Otp"
import {createUserWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from "react-router-dom";

export default function SignUp()
{
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[confirmpassword,setConfirmpassword] = useState("");

    const nav = useNavigate();


    const husername = (event) => {
        setUsername(event.target.value);
    } 

    const hpassword = (event) =>{
        setPassword(event.target.value);
    }

    const hconfirmpassword = (event) =>{
        setConfirmpassword(event.target.value);
    }

    const Display = (event) =>{
        event.preventDefault();
        if(password === confirmpassword)
        {
            createUserWithEmailAndPassword(auth, username, password)
            .then((res) =>{
                alert("Account Created Successfully")
                nav("/login")
            })
            .catch((err) =>{
                alert(err.code);
                setUsername("");
                setPassword("");
                setConfirmpassword("");
            })
        }
        else{
            alert("Password and Confirm Password must be same");
            setPassword("");
            setConfirmpassword("");
        }
    }


    return (
        <>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:h-screen lg:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                          Create an account
                      </h1>
                      <form className="space-y-4 md:space-y-6" onSubmit={Display}>
                          <div>
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                              <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={husername} value={username} autoComplete=""/>
                          </div>
                          <div>
                              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                              <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={hpassword} value={password} autoComplete=""/>
                          </div>
                          <div>
                              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                              <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""  onChange={hconfirmpassword} value={confirmpassword}  autoComplete=""/>
                          </div>
                          <br/>
                          <input type="submit" className="w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-[#93c5fd] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:focus:ring-[#1e40af]" value="Create an account"  />
                          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                              Already have an account? <a href="/login" className="font-medium text-[#2c63ee] hover:underline dark:text-[#3b82f6]">Login here</a>
                          </p>
                      </form>
                  </div>
              </div>
          </div>
        </section>
        </>
    );
}
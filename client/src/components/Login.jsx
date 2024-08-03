import {useEffect,useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {auth} from "./Firebase"
import {signInWithEmailAndPassword} from "firebase/auth"

export default function Login()
{
    const [info,setInfo] = useState([]);
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");

    const husername = (event) => {
        setUsername(event.target.value);
    } 

    const hpassword = (event) =>{
        setPassword(event.target.value);
    }

    const nav = useNavigate();

    const Login = (event) =>{
        event.preventDefault();
        signInWithEmailAndPassword(auth, username, password)
        .then((res) => {
            alert("Login Successfull")
            nav("/",{state:{username,password}})
        })
        .catch((err) => {
            alert(err.code)
            setUsername("");
            setPassword("");
        });
        sessionStorage.setItem('un',username)
    }


    return(
        <>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:h-screen lg:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                  <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                      <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                          Sign in to your account
                      </h1>
                      <form className="space-y-4 md:space-y-6" onSubmit={Login}>
                          <div>
                              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                              <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5" placeholder="name@company.com" required="" onChange={husername} value={username} autoComplete=""/>
                          </div>
                          <div>
                              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                              <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#2563eb] focus:border-[#2563eb] block w-full p-2.5" required="" onChange={hpassword} value={password} autoComplete=""/>
                          </div>
                          <div className="flex items-center justify-between">
                              <div className="flex items-start">
                              </div>
                          </div>
                          <button type="submit" className="w-full text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:ring-4 focus:outline-none focus:ring-[#93c5fd] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] dark:focus:ring-[#1e40af]">Sign in</button>
                          <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
                              Don’t have an account yet? <a href="/signup" className="font-medium text-[#2563eb] hover:underline dark:text-[#3b82f6]">Sign up</a>
                          </p>
                      </form>
                  </div>
              </div>
          </div>
        </section>
        </>
    );
}
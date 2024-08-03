import { useState } from "react";
import NavBar from "../components/NavBar";
import emailjs from '@emailjs/browser';

export default function ContactUs()
{

    const [email,setEmail] = useState("");
    const [subject,setSubject] = useState("");
    const [message,setMessage] = useState("");

    const hEmail = (event) =>{
        setEmail(event.target.value)
    }

    const hSubject = (event) =>{
        setSubject(event.target.value)
    }

    const hMessage = (event) =>{
        setMessage(event.target.value)
    }

    let un = sessionStorage.getItem('un')

    const Submit = (event) =>{
        event.preventDefault();
        if(email!= "" && subject!= "" && message!= "" && un)
        {
            console.log(email,subject,message);
            let data  = {email,subject,message};
            emailjs.send("service_wfcrm07","template_weguzqf",data,"G349lgLI01dZCiJPj")
            .then(res=> alert("We will get back to you"))
            .catch(err=>console.log("issue"+err));
        }
        else if(!un)
        {
            alert("Login First")
        }
    }


    return(
        <>
        <NavBar/>
        <section class="bg-white dark:bg-gray-900">
          <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <h2 class="mb-4 text-4xl font-bold text-center text-gray-900 dark:text-white">Contact Us</h2>
              <p class="mb-8 lg:mb-16 font-light text-center text-black dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
              <form class="space-y-8" onSubmit={Submit}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                      <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@gmail.com" required onChange={hEmail}/>
                  </div>
                  <div>
                      <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                      <input type="text" id="subject" class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required onChange={hSubject}/>
                  </div>
                  <div class="sm:col-span-2">
                      <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                      <textarea id="message" rows="6" class="block resize-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..." onChange={hMessage}></textarea>
                  </div>
                  <input type="submit" class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" />
              </form>
          </div>
        </section>
        </>
    );
}
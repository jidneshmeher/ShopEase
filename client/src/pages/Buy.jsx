import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Filter from "../components/Filter";
import Footer from "../components/Footer";

export default function Buy()
{
    return(
        <>
        <NavBar/>
        <Filter/>
        <Footer/>
      </>
    );
}
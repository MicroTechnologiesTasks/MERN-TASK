import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Navi(props) {
const[name,setName]=useState("")

const[data,setData]=useState({})


async function getnameAndData(){
   
    let response=await axios.get(`http://localhost:3111/api/getEmployeeById?id=${localStorage.getItem("id")}`)
    console.log(response)
    setName(response.data[0].firstname)


    setData(response.data[0]);


    console.log(data)
}
useEffect(() => {
    getnameAndData();
  }, []);

  ////////////       SAMAJ AYA KI NAHI           /////////////


  return (
   <nav style={{backgroundColor:'#463d4b',display:'flex',justifyContent:'end',alignItems:'center',padding:'1%'}}> 
   <h4 style={{color:'#fff',gap:'5px',paddingRight:'15px'}} className="d-flex align-items-center"><i class='bx bxs-user-circle' style={{color:'#ffff',fontSize:'29px'}}  ></i> {name} </h4>


   </nav>
  );
}

export default Navi;

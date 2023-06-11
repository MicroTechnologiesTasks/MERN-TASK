import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navi from "./Navi";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";


function Profile() {
    const[datas,setData]=useState({})

  async function getnameAndData(){
   
    let response=await axios.get(`http://localhost:3111/api/getEmployeeById?id=${localStorage.getItem("id")}`)
    console.log(response)
    


    setData(response.data[0]);


    console.log("this is datas",datas)
}
useEffect(() => {
    getnameAndData();
  }, []);
  return (
    <>
      <Navi  />
      <Sidebar />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>MY PROFILE</h1>
      <div className="d-flex justify-content-center align-items-center  " style={{gap:'60px',width:'800px',  boxShadow: '0px 1px 13px rgba(0,0,0,0.1)'}}>
        <div className="d-flex flex-column align-items-start">
        <h3>Email-: <span style={{color:"blue"}}>{datas.id}</span></h3>
        <h3>First Name-: <span style={{color:"blue"}}>{datas.firstname}</span></h3>
        <h3>last Name-:<span style={{color:"blue"}}>{datas.lastname}</span></h3>
        <h3>Department-:<span style={{color:"blue"}}>{datas.departmentName}</span></h3>
        </div>
        <div className="d-flex flex-column align-items-start">
       <h3>Category-: <span style={{color:"blue"}}>{datas.categoryName}</span></h3>
        <h3>location-:<span style={{color:"blue"}}>{datas.location}</span></h3>
        <h3>Salary-:<span style={{color:"blue"}}>{datas.salary}</span></h3>
        <h3>Hobby-:<span style={{color:"blue"}}>{datas.hobbies}</span></h3>
       </div>
      </div>
      </div>
    </>
  );
}

export default Profile;

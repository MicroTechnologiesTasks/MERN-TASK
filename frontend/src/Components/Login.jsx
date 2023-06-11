import React from "react";
import "../style/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
    let navigate = useNavigate();


const[email,setEmail]=useState("")

const[pass,setPass]=useState("")

async function loginkarvao(e){
    e.preventDefault()
    let response=await axios.post("http://localhost:3111/api/Employeelogin",{
        id:email,
     
        password:pass
       
    })
    console.log("this is response",response);

    localStorage.setItem("id",response.data.iD)
    localStorage.setItem("Token",response.data.token)

    if(response.data.message=="Login Successfull"){

        alert(`Welcome ${localStorage.getItem("id")}`)
       setTimeout( navigate("/profile"),2000)
        
    }else if(response.data.message=="Inavlid Credentials"){
      alert("Invalid Credentials")
    }

}


  return (
    <div style={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
    <div class="form-box">
      <form class="form">
        <span class="title">Log In</span>
        <span class="subtitle">Create a free account with your email.</span>
        <div class="form-container">

          <input type="email" class="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" class="input" placeholder="Password"  value={pass} onChange={(e)=>setPass(e.target.value)} />
        </div>
        <button onClick={(e)=>loginkarvao(e)}>Sign up</button>
      </form>
      <div class="form-section">
        <p>
         Don't Have an account? <Link to='/signup'>Sign Up</Link>{" "}
        </p>
      </div>
    </div>
    </div>
  );
}

export default Login;

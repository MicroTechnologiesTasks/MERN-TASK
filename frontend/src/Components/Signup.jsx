import React from "react";
import "../style/login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [hobbies, setHobbies] = useState("");

  let navigate=useNavigate();

  async function createaccount(e){
    e.preventDefault()
let response=await axios.post("http://localhost:3111/api/addEmployee",{
  id:email,
  firstname:fname,
  lastname:lname,
  password:pass,
  hobbies:hobbies
})

console.log(response)
if(response.data.message=="Account Registerd"){
  alert("Account Created")
  navigate('/')
}
  }
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div class="form-box">
        <form class="form">
          <span class="title">Sign up</span>
          <span class="subtitle">Create a free account with your email.</span>
          <div class="form-container">
            <input
              type="text"
              class="input"
              placeholder="First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
            <input
              type="text"
              class="input"
              placeholder="Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
            <input
              type="email"
              class="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              class="input"
              placeholder="Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <textarea
              type="text"
              class="input"
              placeholder="Hobbies"
              rows="8"
              value={hobbies}
              onChange={(e) => setHobbies(e.target.value)}
            />
          </div>
          <button onClick={(e)=>createaccount(e)}>Sign up</button>
        </form>
        <div class="form-section">
          <p>
            Have an account? <Link to="/">Log in</Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

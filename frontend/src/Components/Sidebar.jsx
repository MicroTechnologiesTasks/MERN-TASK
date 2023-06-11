import React, { useEffect, useState } from "react";
import "../style/Sidebar.css";
import { Link } from "react-router-dom";
import { Alert } from "bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Sidebar() {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("id");
    localStorage.removeItem("Token");
    navigate("/");
  }


  const [datas, setData] = useState({})

  
  async function getnameAndData() {

    let response = await axios.get(`http://localhost:3111/api/getEmployeeById?id=${localStorage.getItem("id")}`)
    console.log(response)


    setData(response.data[0]);


    console.log("this is datas", datas)
  }
  useEffect(() => {
    getnameAndData();
  }, []);


  
  return (
    <>
      <div class="sidebar">
        <div class="logo-details">
          <i class="bx bxs-pyramid"></i>
          <span class="logo_name">DashBoards</span>
        </div>

        <ul class="nav-links">
         
         {
         (datas.departmentName=="Manager")? <li>
            <Link to="/Manage">
              <div class="icon-link">
                <a href="#">
                  <i class="bx bx-grid-alt"></i>
                  <span class="link_name">Manage</span>
                </a>
              </div>
            </Link>
          </li>:
          <li></li>
          }

          <li>
            <Link to="/Profile">
              <div class="icon-link">
                <a href="#">
                  <i class="bx bx-user"></i>
                  <span class="link_name">Profile</span>
                </a>
              </div>
            </Link>
          </li>
          <li>
            <div class="icon-link" onClick={() => logout()}>
              <a href="#">
                <i class="bx bx-log-out"></i>
                <span class="link_name">Logout</span>
              </a>
            </div>
          </li>


          {/* <li>
        <div class="profile-details">
          <div class="profile-content">
            <img src="http://placebeard.it/250/250" alt="profileImg"/>
          </div>
          <div class="name-job">
            <div class="profile_name">Farid Vatani</div>
            <div class="job">Software Engineer</div>
          </div>
          <i class='bx bx-log-out'></i>
        </div>
      </li> */}

        </ul>
      </div>
    
    </>
  );
}

export default Sidebar;

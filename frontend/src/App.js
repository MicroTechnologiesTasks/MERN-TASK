import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './Components/Signup';
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';
import Profile from './Components/Profile';
import Manage from './Components/Manage';
import Errpg from './Components/Errpg';

function App() {
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
    <div className="App">

      {
        (localStorage.getItem("id") == undefined || localStorage.getItem("Token") == undefined) ?
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<Errpg />} />
            </Routes>
          </BrowserRouter>
          :
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="signup" element={<Signup />} />

              <Route path="Home" element={<Dashboard />} />

              {
                (datas.departmentName == "Manager") ? <Route path="Manage" element={<Manage />} /> : <Route path="Manage" element={<Errpg />} />
              }


              <Route path="Profile" element={<Profile />} />
              <Route path="*" element={<Errpg />} />
            </Routes>
          </BrowserRouter>
      }


















    </div>
  );
}

export default App;


{/*select * from employee where departmentName='IT' and location Like "A%"; */
/** select * from employee where departmentName='Sales' order by firstname desc */}
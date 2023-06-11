import React, { useEffect, useState } from "react";
import Navi from "./Navi";
import Sidebar from "./Sidebar";
import DataTable from "react-data-table-component";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

function Manage() {
const[dep,setDep]=useState("")
const[loc,setLoc]=useState("")
const[cat,setCat]=useState("")
const[sal,setSal]=useState("")
const[id,setID]=useState("")

const[emp,setEmp]=useState("")

  const [data, setdata] = useState();
  const [Deptdata, setDeptdata] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getemployees() {
    let response = await axios.get("http://localhost:3111/api/getAllEmployees");
    let response2 = await axios.get("http://localhost:3111/api/getAllDepartment");
   
    console.log(response);
    setdata(response.data);
    setDeptdata(response2.data)
  }
  useEffect(() => {
    getemployees();
  }, []);



function getDatatoupdate(row,e){
    e.preventDefault();
setID(row.id)
setDep(row.departmentName);
setCat(row.categoryName)
setLoc(row.location)
setSal(row.salary)
setEmp(row.firstname +" "+row.lastname)
handleShow();
}

async function savethedata(e){
    e.preventDefault();

let response=await axios.put(`http://localhost:3111/api/updateEmployee?id=${id}`,{
    "dep":dep,
    "cat":cat,
    "loc":loc,
    "sal":sal
})
if(response.data.message=="Success"){
    alert("Data Updated Successfully")
    handleClose();
    setID("");
}else{
    alert("Some Error in Backend");
}

    
}



  const columns = [
    {
      name: "Email",
      selector: (row) => row.id,
    },
    {
      name: "First Name",
      selector: (row) => row.firstname,
    },
    /*categoryName
: 
null
departmentName
: 
null
firstname
: 
"Anuj"
gender
: 
null
hobbies
: 
"Cricket"
id
: 
"anu1@gmail.com"
lastname
: 
"Gurj"
location
: 
null
salary
: 
null*/
    {
      name: "Last Name",
      selector: (row) => row.lastname,
    },
    {
      name: "Department",
      selector: (row) => row.departmentName,
    },
    {
      name: "Category",
      selector: (row) => row.categoryName,
    },
    {
      name: "Location",
      selector: (row) => row.location,
    },
    {
      name: "Salary",
      selector: (row) => row.salary,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button onClick={(e)=>getDatatoupdate(row,e)}>
          <i class="bx bx-edit"></i>
        </Button>
      ),
    },
  ];

  // const data = [
  //     {
  //         id: 1,
  //         title: 'Beetlejuice',
  //         year: '1988',
  //     },
  //     {
  //         id: 2,
  //         title: 'Ghostbusters',
  //         year: '1984',
  //     },
  // ]
  return (
    <>
      <Navi />
      <Sidebar />
      <div className="d-flex justify-content-center">
        <div style={{ width: "1000px", paddingLeft: "5%" }}>
          <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            striped
            responsive
            paginationRowsPerPageOptions={[5, 10, 15]}
          />
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Updating -: <span style={{color:"blue"}}>{emp}</span></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Select Department</Form.Label>
              <Form.Select aria-label="Default select example" value={dep} onChange={(e)=>setDep(e.target.value)}>
                <option>Open this select menu</option>
              {
                Deptdata.map((item,index)=>{
                    return (     <option key={index} value={item.department_name}>{item.department_name}</option>)
                })
              }
              </Form.Select>
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" placeholder="Enter Category"  value={cat} onChange={(e)=>setCat(e.target.value)}/>
              
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Enter Location" value={loc} onChange={(e)=>setLoc(e.target.value)} />
             
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSalary">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="text" placeholder="Enter Salary" value={sal} onChange={(e)=>setSal(e.target.value)} />
             
            </Form.Group>
            
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e)=>savethedata(e)}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Manage;

const express = require("express");
const cors=require('cors')


const empRouter = express.Router();

empRouter.use((req,res,next)=>{
  res.header('Access-Control-Allow-origin','*');
  next();
})
empRouter.use(express.static('public'));
empRouter.use(cors());
empRouter.use(express.json())

const { getAllEmployees,getEmployeeById,Employeelogin,addEmployee,getAllDepartment,updateEmployee } = require('../controller/empapi');



empRouter.get('/getAllEmployees', getAllEmployees);
empRouter.get('/getEmployeeById', getEmployeeById);
empRouter.get('/getAllDepartment', getAllDepartment);
empRouter.post('/Employeelogin', Employeelogin);
empRouter.post('/addEmployee', addEmployee);

empRouter.put('/updateEmployee', updateEmployee);

  module.exports=empRouter

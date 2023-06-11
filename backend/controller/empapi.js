const connection = require('../model/dbconnect');


const jwt = require("jsonwebtoken")

const secretKey = "mynameis#Anuraggurjar9589"

const getAllEmployees = (req, res) => {
    let sql_query = `SELECT id,firstname,lastname,gender,hobbies ,departmentName ,categoryName,location,salary from employee`
    connection.query(sql_query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
};

const getEmployeeById = (req, res) => {
    let data = [req.query.id]
    let sql_query = `SELECT id,firstname,lastname,gender,hobbies ,departmentName ,categoryName,location,salary from employee where id=?`
    connection.query(sql_query, data, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
};

const addEmployee = (req, res) => {
    let data = [req.body.id, req.body.firstname, req.body.lastname, req.body.password, req.body.hobbies]
    let sql_query = `Insert into employee(id,firstname,lastname,password,hobbies) values(?,?,?,?,?)`
    connection.query(sql_query, data, (err, result) => {
        if (err) {
            console.log(err.sqlMessage);
        } else {
            res.send({
                status:'200',
                message:'Account Registerd'
            });
        }
    })
};


const Employeelogin = (req, res) => {

    let data = [req.body.id, req.body.password]

    const uid = req.body.id

    const user = {
        id: uid,
    }

    let sql_query = `Select id , password from employee where id =? and Password=?`

    connection.query(sql_query, data, (err, result) => {
        if (err) {
            console.log(err.sql);
        } else {

            if (result.length == 0) {
                res.send({
                    message: "Inavlid Credentials"
                })
            }
            else {

                jwt.sign({ user }, secretKey, { expiresIn: '3000000s' }, (err, token) => {
                    if (err) {
                        console.log("JWT ERROR")
                    } else {
                        res.send({
                            message: "Login Successfull",
                            iD: result[0].id,
                            token: token
                        })
                    }
                })
            }

        }
    })
};



const getAllDepartment = (req, res) => {
    let sql_query = `SELECT * from deparment`
    connection.query(sql_query, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
}


const updateEmployee = (req, res) => {
    const data = [
        req.body.dep,
        req.body.cat,
        req.body.loc,
        req.body.sal,
        req.query.id
    ]

    let sql_query = `Update employee set departmentName=?,categoryName=?,location=?,salary=? where id=?`
    connection.query(sql_query, data, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send({
                status: 200,
                message: "Success"
            });
        }
    })
};


module.exports = { getAllEmployees, getEmployeeById, Employeelogin, addEmployee, getAllDepartment, updateEmployee }
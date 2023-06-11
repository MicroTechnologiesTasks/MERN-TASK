const sql=require('mysql');

let connection=sql.createConnection({
    user:"root",
    password:"",
    host:"localhost",
    database:"emp_dashboard"
});

module.exports=connection;
const Mysql = require("mysql");

const connection = Mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "SCHOOL"
});

connection.connect((err) => {
    err ? console.log(err) : console.log("SQL Connected");
    
    connection.query("SELECT * FROM Students", (err, res) => {
        err ? console.log(err) : console.log(res[0]);
    })
})
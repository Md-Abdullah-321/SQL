const connection = require("./connection");


connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("SQL Connected");
    }

    
    connection.query("SELECT * FROM Students", (err, res) => {
        err ? console.log(err) : console.log(res);
    })
})
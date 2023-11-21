const connection = require('./connection.js')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Register.html');
})


app.post('/', async (req, res) => {
    try {
        const { roll, student_name, department, semester, shift } = req.body;

        // Check if any required field is empty
        if (!roll || !student_name || !department || !semester || !shift) {
            return res.status(400).json("All fields are required.");
        }

        // Check if the student already exists
        const existingStudent = await queryAsync("SELECT * FROM Students WHERE roll = ?", [roll]);

        if (existingStudent.length > 0) {
            return res.status(403).json("User is already exist.");
        }

        // Insert new student
        const insertQuery = "INSERT INTO Students(roll, student_name, department, semester, shift) VALUES (?, ?, ?, ?, ?)";
        const result = await queryAsync(insertQuery, [roll, student_name, department, semester, shift]);

        res.send('Student Register Successful');
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    } finally {
        // Close the database connection
        if (connection) {
            connection.end();
        }
    }
});

// Function to execute SQL queries with async/await
function queryAsync(sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
app.listen(3000, () => {
    console.log(`Server connected on port 3000`);
})
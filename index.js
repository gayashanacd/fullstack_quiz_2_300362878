const mongoose = require('mongoose');
const express = require('express')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();
const port = process.env.PORT || 3000;

// Create a Schema object
const studentSchema = new mongoose.Schema({
    studentName: String,
    studentID: String
});

// Create a Model object
const Student = mongoose.model('s24students', studentSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {

    // get the data from the form
    const dbUrl = req.body.myuri;

    try {
        // Connect to the database and log the connection
        await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        // Create a new student 
        const student = new Student({
            studentName: "Subasinghe Mudiyanselage Indika Gayashan Upasena",
            studentID: "300362878"
        });

        // Save the student document to the w24students collection in the Winter24 database
        await student.save();
        // Send a response to the user
        res.send(`<h2> Student : ${student.studentName} is  added successfully </h2>`);

    } catch (err) {

        console.error('Error connecting to MongoDB or saving data:', err);
        res.status(500).send('Error connecting to MongoDB or saving data.');

    } finally {

        mongoose.connection.close();
    }

});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// mongodb+srv://july17:july17@cluster0.0p7zae5.mongodb.net/Summer24
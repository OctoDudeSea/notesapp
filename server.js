const express = require('express')
const app = express().use(express.json());
const mongoose = require('mongoose');
const Note = require('./models/note.model.js');
const cors = require('cors');
const path = __dirname + '/dist/';

app.use(cors())
app.use(express.static(path));

app.get('/', async(req, res) => {
    res.sendFile(path + 'index.html');
})

//Get a single note
app.get('/api/note/:id', async(req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.status(200).send(note);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Get all notes
app.get('/api/notes', async(req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).send(notes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Create a new note
app.post('/api/notes', async(req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(200).send(note);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//Connect to the database
mongoose.connect('mongodb+srv://octodude:robertmongodb@notesappdata.ssw6n6s.mongodb.net/?retryWrites=true&w=majority&')
.then(() => {
    console.log('Connected to database!');
    app.listen(3000, () => {
        console.log('Server is running on http:/localhost:3000/');
    });
})
.catch(() => console.log('Connection failed!'));


//To run the server and apply changes without restart, install nodemon and run the server with the following command:
//npx nodemon src/server.js
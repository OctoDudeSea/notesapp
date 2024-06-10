const mongoose = require('mongoose');

const NoteScheema = mongoose.Schema({
    author: {
        type: String,
        default: 'Anonymous',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    },

    comments: [
        {
        author: { type: String, required: true },
        content: { type: String, required: true },
        date: { type: Date, default: Date.now }
        }
    ],
});

const Note = mongoose.model('Note', NoteScheema);
module.exports = Note;
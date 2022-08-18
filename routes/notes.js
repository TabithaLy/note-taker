// Syntax from \UPENN-VIRT-FSF-FT-07-2022-U-LOLC\11-Express\01-Activities\24-Stu_Custom-Middleware\Solved\routes\tips.js
const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
// copied and modified syntax from \UPENN-VIRT-FSF-FT-07-2022-U-LOLC\11-Express\01-Activities\24-Stu_Custom-Middleware\Solved\routes\tips.js
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
// copied and modified syntax from \UPENN-VIRT-FSF-FT-07-2022-U-LOLC\11-Express\01-Activities\24-Stu_Custom-Middleware\Solved\routes\tips.js
notes.post('/', (req, res) => {

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
        title,
        text,
      note_id: uuid(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;

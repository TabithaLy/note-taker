// copied and modified from \UPENN-VIRT-FSF-FT-07-2022-U-LOLC\11-Express\01-Activities\24-Stu_Custom-Middleware\Solved\server.js and \tips.js
const express = require('express');
const path = require('path');
const api = require('./public/assets/js/index.js');
const { readFromFile, readAndAppend } = require('./helpers/fsUtils');
const PORT = 3001;
const uuid = require('./helpers/uuid');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// GET * should return the index.html file.
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET /notes should return the notes.html file.
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// GET /api/notes should read the db.json file and return all saved notes as JSON.
// copied syntax from \UPENN-VIRT-FSF-FT-07-2022-U-LOLC\11-Express\01-Activities\24-Stu_Custom-Middleware\Solved\routes\tips.js
app.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
// copied syntax from \UPENN-VIRT-FSF-FT-07-2022-U-LOLC\11-Express\01-Activities\24-Stu_Custom-Middleware\Solved\routes\tips.js
app.post('/api/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid() 
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully 🚀`);
    } else {
      res.error('Error in adding note');
    }
  });
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
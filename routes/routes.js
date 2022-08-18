// Syntax from \UPENN-VIRT-FSF-FT-07-2022-U-LOLC\11-Express\01-Activities\24-Stu_Custom-Middleware\Solved\routes\index.js
const express = require('express');

const notesRouter = require('./notes');

const app = express();

app.use('/notes', notesRouter);

module.exports = app; 
const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  title: String,
  description: String,
  date: String,
  isDone: Boolean,
  author_id: String,
  group_id: String,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;

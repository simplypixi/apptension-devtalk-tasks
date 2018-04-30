const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  content: String,
  author_id: String,
  group_id: String,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;

const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
  name: String,
  author_id: String,
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;

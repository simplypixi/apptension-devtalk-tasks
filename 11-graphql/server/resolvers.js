const fakeDatabase = require('./fakeDatabase');
const Note = require('./models/Note');
const Group = require('./models/Group');
const Author = require('./models/Author');

const getItemAuthor = (item) => {
  return new Promise((resolve, reject) => {
    Author.findOne({_id: item.author_id}, (err, author) => {
      err ? reject(err) : resolve(author)
    });
  });
};

const getAuthors = (_, {id}) => {
  return new Promise((resolve, reject) => {
    if (id) {
      Author.find({_id: id}, (err, authors) => {
        err ? reject(err) : resolve(authors)
      });
    } else {
      Author.find((err, authors) => {
        err ? reject(err) : resolve(authors)
      });
    }
  });
};
        
const getNotes = (_, {id}) => {
  return new Promise((resolve, reject) => {
    if (id) {
      Note.find({_id: id}, (err, notes) => {
        err ? reject(err) : resolve(notes)
      });
    } else {
      Note.find((err, notes) => {
        err ? reject(err) : resolve(notes)
      });
    }
  });
};

const getGroups = (_, {id}) => {
  return new Promise((resolve, reject) => {
    if (id) {
      Group.find({_id: id}, (err, groups) => {
        err ? reject(err) : resolve(groups)
      });
    } else {
      Group.find((err, groups) => {
        err ? reject(err) : resolve(groups)
      });
    }
  });
};

const getItemGroup = (item) => {
  return new Promise((resolve, reject) => {
    Group.findOne({_id: item.group_id}, (err, group) => {
      err ? reject(err) : resolve(group)
    });
  });
};

const createNote = (_, {content}) => {
  const note = new Note({content, author_id: '1', group_id: '1'});
  return new Promise((resolve, reject) => {
    note.save((err, note) => {
      if (err) reject(err);
      return resolve([note]);
    });
  });
};

const deleteNote = (_, {id}) => {
    fakeDatabase.notes = fakeDatabase.notes.filter(note => note.id !== id)
    return fakeDatabase.notes;
};

const createGroup = (_, {name}) => {
  const group = new Group({name, author_id: '1'});
  return new Promise((resolve, reject) => {
    group.save((err, group) => {
      if (err) reject(err);
      return resolve([group]);
    });
  });
};

const deleteGroup = (_, {id}) => {
  fakeDatabase.groups = fakeDatabase.groups.filter(group => group.id !== id)
  fakeDatabase.notes = fakeDatabase.notes.filter(note => note.group_id !== id)
  return fakeDatabase.groups;
};

module.exports = {
    getItemAuthor,
    getAuthors,
    getNotes,
    getGroups,
    getItemGroup,
    createNote,
    deleteNote,
    createGroup,
    deleteGroup
};

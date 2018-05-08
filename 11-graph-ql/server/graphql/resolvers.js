const Note = require('../models/Note');
const Group = require('../models/Group');
const Author = require('../models/Author');
const mockDb = require('../db/mockDatabase');

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

const createNote = (_, {title, description, date, isDone}) => {
  const note = new Note({
    title,
    description,
    date,
    isDone,
    author_id: mockDb.exampleAuthor,
    group_id: mockDb.exampleGroup
  });
  return new Promise((resolve, reject) => {
    note.save((err, note) => {
      if (err) reject(err);
      return resolve([note]);
    });
  });
};

const deleteNote = (_, {id}) => {
  return new Promise((resolve, reject) => {
    Note.remove({ _id: id }, function (err) {
      Note.find((err, notes) => {
        err ? reject(err) : resolve(notes)
      });
    });
  });
};

const updateNote = (_, {id, description}) => {
  return new Promise((resolve, reject) => {
    Note.findByIdAndUpdate(id, { $set: { description, title: description.slice(0, 10) }}, {}, (err, note) => {
      err ? reject(err) : resolve([note])
    });
  });
};

const createGroup = (_, {name}) => {
  const group = new Group({name, author_id: mockDb.exampleAuthor});
  return new Promise((resolve, reject) => {
    group.save((err, group) => {
      if (err) reject(err);
      return resolve([group]);
    });
  });
};

const deleteGroup = (_, {id}) => {
  return new Promise((resolve, reject) => {
    const resolveGroupDelete = resolve;
    const rejectGroupDelete = reject;

    const removePromises = [
      new Promise((resolve, reject) => {
        Group.remove({ _id: id }, function (err) {
          resolve()
        });
      }),
      new Promise((resolve, reject) => {
        Note.remove({ group_id: id }, function (err) {
          resolve()
        });
      }),
    ];

    Promise.all(removePromises).then(() => {
      Group.find((err, groups) => {
        err ? rejectGroupDelete(err) : resolveGroupDelete([groups])
      });
    });
  });
};

module.exports = {
    getItemAuthor,
    getAuthors,
    getNotes,
    getGroups,
    getItemGroup,
    createNote,
    updateNote,
    deleteNote,
    createGroup,
    deleteGroup
};

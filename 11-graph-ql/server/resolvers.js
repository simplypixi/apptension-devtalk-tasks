const fakeDatabase = require('./fakeDatabase');
const Note = require('./models/Note');
const Group = require('./models/Group');

const getItemAuthor = (item) => {
    return fakeDatabase.authors.find(author => author.id == item.author_id);
}        

const getAuthors = (_, {id}) => {
    if (id) return fakeDatabase.authors.filter(author => author.id === id);
    return fakeDatabase.authors;
}
        
const getNotes = (_, {id}) => {
    if (id) return fakeDatabase.notes.filter(note => note.id === id);
    return fakeDatabase.notes;
}

const getGroups = (_, {id}) => {
    if (id) return fakeDatabase.groups.filter(group => group.id === id);
    return fakeDatabase.groups;
}

const getItemGroup = (item) => {
    return fakeDatabase.groups.find(group => group.id == item.group_id);
} 

const createNote = (_, {content}) => {
    const newNote = new Note(content);
    fakeDatabase.notes.push(newNote);
    return fakeDatabase.notes;
}

const deleteNote = (_, {id}) => {
    fakeDatabase.notes = fakeDatabase.notes.filter(note => note.id !== id)
    return fakeDatabase.notes;
}

const createGroup = (_, {name}) => {
    const newNote = new Group(name);
    fakeDatabase.groups.push(newNote);
    return fakeDatabase.groups;
}

const deleteGroup = (_, {id}) => {
    fakeDatabase.groups = fakeDatabase.groups.filter(group => group.id !== id)
    fakeDatabase.notes = fakeDatabase.notes.filter(note => note.group_id !== id)
    return fakeDatabase.groups;
}

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
}
const fakeDatabase = require('./fakeDatabase');

const getNoteAuthor = (note) => {
    return fakeDatabase.authors.find(author => author.id == note.author_id);
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

const getGroupAuthor = (group) => {
    return fakeDatabase.authors.find(author => author.id == group.author_id);
} 

const getNoteGroup = (note) => {
    return fakeDatabase.groups.find(group => group.id == note.group_id);
} 

module.exports = {
    getNoteAuthor,
    getAuthors,
    getNotes,
    getGroups,
    getNoteGroup,
    getGroupAuthor
}
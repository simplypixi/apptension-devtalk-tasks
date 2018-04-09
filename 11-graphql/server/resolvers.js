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

module.exports = {
    getNoteAuthor,
    getAuthors,
    getNotes
}
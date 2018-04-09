const fakeDatabase = require('./fakeDatabase');

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

module.exports = {
    getItemAuthor,
    getAuthors,
    getNotes,
    getGroups,
    getItemGroup,
}
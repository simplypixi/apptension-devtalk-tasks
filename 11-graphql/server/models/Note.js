class Note {
    constructor(content) {
        this.content = content;
        this.author_id = '1';
        this.group_id = '1';
        this.id = `${++Note.id}`;
    }
}

Note.id = 100;

module.exports = Note;
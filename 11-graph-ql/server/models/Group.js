class Group {
    constructor(name) {
        this.name = name;
        this.author_id = '1';
        this.id = `${++Group.id}`;
    }
}

Group.id = 100;

module.exports = Group;
const notes = [
    {
        id: '1',
        description: 'My first note',
        author_id: '1',
        group_id: '1'
    },
    {
        id: '2',
        description: 'Do something cool',
        author_id: '1',
        group_id: '2'
    },
    {
        id: '3',
        description: 'Do something',
        author_id: '2',
        group_id: '3'
    },
    {
        id: '4',
        description: 'Do something',
        author_id: '3',
        group_id: null
    }
];

const authors = [
    {
        id: '1',
        name: 'John'
    },
    {
        id: '2',
        name: 'George'
    },
    {
        id: '3',
        name: 'Jan'
    }
];

const groups = [
    {
        id: '1',
        author_id: '1',
        name: 'Notes'
    },
    {
        id: '2',
        author_id: '1',
        name: 'Project1'
    },
    {
        id: '3',
        author_id: '2',
        name: 'My notes'
    }
];

module.exports = {
    notes,
    authors,
    groups
}

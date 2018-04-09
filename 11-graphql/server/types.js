const { 
    GraphQLInt, 
    GraphQLString,
    GraphQLObjectType, 
    GraphQLList
} = require('graphql');

const {
    getAuthors,
    getNotes,
    getGroups,
    getItemGroup,
    getItemAuthor,
    createNote,
    deleteNote
} = require('./resolvers');

const AuthorType = new GraphQLObjectType({
    name: 'author',
    description: 'an author',
    fields: {
        id: {type: GraphQLString},
        name: {type: GraphQLString}
    }
});

const GroupType = new GraphQLObjectType({
    name: 'group',
    description: 'a note group',
    fields: {
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve: getItemAuthor
        },
    }
});

const NoteType = new GraphQLObjectType({
    name: 'note',
    description: 'a note',
    fields: {
        id: {type: GraphQLString},
        content: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve: getItemAuthor
        },
        group: {
            type: GroupType,
            resolve: getItemGroup
        }
    }
});

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    fields: {
        authors: {
            type: new GraphQLList(AuthorType),
            description: "List of all Authors",
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: getAuthors
        },
        notes: {
            type: new GraphQLList(NoteType),
            description: "List of all Notes",
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: getNotes
        },
        groups: {
            type: new GraphQLList(GroupType),
            description: "List of all groups",
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: getGroups
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createNote: {
            type: new GraphQLList(NoteType),
            args: {
                content: {
                    type: GraphQLString
                }
            },
            resolve: createNote
        },
        deleteNote: {
            type: new GraphQLList(NoteType),
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: deleteNote
        }
    }
});

module.exports = {
    AuthorType,
    NoteType,
    GroupType,
    QueryType,
    Mutation
}
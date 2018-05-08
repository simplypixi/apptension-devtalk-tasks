const { 
    GraphQLInt, 
    GraphQLString,
    GraphQLBoolean,
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
    updateNote,
    deleteNote,
    createGroup,
    deleteGroup
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
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        date: {type: GraphQLString},
        isDone: {type: GraphQLBoolean},
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
              title: { type: GraphQLString },
              description: { type: GraphQLString },
              date: {type: GraphQLString},
              isDone: {type: GraphQLBoolean},
            },
            resolve: createNote
        },
        updateNote: {
            type: new GraphQLList(NoteType),
            args: {
              id: { type: GraphQLString },
              description: { type: GraphQLString },
            },
            resolve: updateNote
        },
        deleteNote: {
            type: new GraphQLList(NoteType),
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: deleteNote
        },
        createGroup: {
            type: new GraphQLList(GroupType),
            args: {
                name: {
                    type: GraphQLString
                }
            },
            resolve: createGroup
        },
        deleteGroup: {
            type: new GraphQLList(GroupType),
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: deleteGroup
        },
    }
});

module.exports = {
    AuthorType,
    NoteType,
    GroupType,
    QueryType,
    Mutation
}

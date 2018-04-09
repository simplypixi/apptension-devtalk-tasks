const { 
    GraphQLInt, 
    GraphQLString,
    GraphQLObjectType, 
    GraphQLList
} = require('graphql');

const {getNotes, getAuthors, getNoteAuthor} = require('./resolvers');

const AuthorType = new GraphQLObjectType({
    name: 'author',
    description: 'an author',
    fields: {
        id: {type: GraphQLString},
        name: {type: GraphQLString}
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
            resolve: getNoteAuthor
        },
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
        }
    }
});

module.exports = {
    AuthorType,
    NoteType,
    QueryType
}
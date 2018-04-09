const express = require('express');
const graphqlHTTP = require('express-graphql');
const { 
    GraphQLInt, 
    GraphQLString, 
    buildSchema, 
    GraphQLObjectType, 
    GraphQLList,
    GraphQLSchema 
} = require('graphql');

const fakeDatabase = require('./fakeDatabase');

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
            resolve: (note) => {
                return fakeDatabase.authors.find(author => author.id == note.author_id);
            }
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
            resolve: (_, {id}) => {
                if (id) return fakeDatabase.authors.filter(author => author.id === id);
                return fakeDatabase.authors;
            }
        },
        notes: {
            type: new GraphQLList(NoteType),
            description: "List of all Notes",
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve: (_, {id}) => {
                if (id) return fakeDatabase.notes.filter(note => note.id === id);
                return fakeDatabase.notes;
            }
        }
    }
});

const appSchema = new GraphQLSchema({query: QueryType});

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: appSchema,
    graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
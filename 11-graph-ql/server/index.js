const express = require('express');
const graphqlHTTP = require('express-graphql');
const { 
    GraphQLSchema 
} = require('graphql');

const {QueryType, Mutation} = require('./types');

const appSchema = new GraphQLSchema({query: QueryType, mutation: Mutation});

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: appSchema,
    graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
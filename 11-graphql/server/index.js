const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const { 
  GraphQLSchema
} = require('graphql');

const Db = require('./Db');

const mockDb = require('./mockDatabase');
console.log(mockDb);

const {QueryType, Mutation} = require('./types');

mongoose.connect('mongodb://localhost:27017');
Db.setDB(mongoose.connection);

const db = Db.getDB();
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected!');

  /* mocking */
  mockDb.mock();
});

const appSchema = new GraphQLSchema({query: QueryType, mutation: Mutation});

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: appSchema,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

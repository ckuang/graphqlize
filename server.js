const express = require('express');
const graphqlHTTP = require('express-graphql');
const GraphQLSchema = require('./graphQLSchema.js')
const db = require('./models')

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: GraphQLSchema,
  graphiql: true
}));


db.sequelize.sync().then(function() {
  console.log('Server running on http://localhost:3000')
  app.listen(8000)
})

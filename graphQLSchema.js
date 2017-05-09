var models = require('./models');
import {resolver, attributeFields} from 'graphql-sequelize';
import {GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLSchema, GraphQLInt, GraphQLString} from 'graphql';
import {_} from 'underscore';


let pokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  description: 'a pokemon',
  // Here we define fields manually.
  // We could use graphql-sequelize's attributeFields if we chose to. (see below)
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The id of the pokemon.'
    },
    name: {
      type: GraphQLString,
      description: 'The name of the pokemon.'
    },
    level: {
      type: GraphQLInt,
      description: 'The level of the pokemon.'
    }
  }
});

let trainerType = new GraphQLObjectType({
  name: 'Trainer',
  description: 'A trainer',
  // And here, we do use graphql-sequelize's attributeFields to automatically populate fields from
  // our sequelize schema.
  fields: _.assign(attributeFields(models.Trainer), {
    pokemon: {
      type: new GraphQLList(pokemonType),
      resolve: resolver(models.Trainer.Pokemon)
    }
  })
});

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      pokemon: {
        // The resolver will use `findOne` or `findAll` depending on whether the field it's used in is a `GraphQLList` or not.
        type: new GraphQLList(pokemonType),
        args: {
          // An arg with the key limit will automatically be converted to a limit on the target
          limit: {
            type: GraphQLInt
          },
          // An arg with the key order will automatically be converted to a order on the target
          order: {
            type: GraphQLString
          }
        },
        resolve: resolver(models.Pokemon)
      },
      trainer: {
        type: new GraphQLList(trainerType),
        resolve: resolver(models.Trainer)
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      createTrainer: {
        type: trainerType,
        args: {
          name: {
            description: 'A name for the trainer',
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        description: 'Creates a new trainer',
        resolve: function(obj, {name}) {
          return models.Trainer.create({
            name: name
          });
        }
      }
    }
  })
});



module.exports = schema;

const express = require('express');
const app = express();
const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')
const movieSchema = require('./schemas/movieSchema')
const tvSeriesSchema = require('./schemas/tvSeriesSchema')
const entertainMeSchema = require('./schemas/entertainMeSchema')


const typeDefs = gql`
    type Query
    type Mutation
`
const schema = makeExecutableSchema({
    typeDefs: [ typeDefs, movieSchema.typeDefs, tvSeriesSchema.typeDefs, entertainMeSchema.typeDefs ],
    resolvers: [movieSchema.resolvers, tvSeriesSchema.resolvers, entertainMeSchema.resolvers],
})

const server = new ApolloServer({
    schema
})

server.listen().then(({ url }) => {
    console.log(`starting server on port ${url}`);
})

import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

import { PORT } from './utils/constants'

async function startApolloServer() {
  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  }

  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()

  const app = express()
  server.applyMiddleware({ app })

  await app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  )

  return { server, app }
}

startApolloServer()

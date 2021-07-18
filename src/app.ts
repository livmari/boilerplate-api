import 'reflect-metadata'
import Express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema, Query, Resolver } from 'type-graphql'
import { PORT } from './helpers/constants'

@Resolver()
export class HelloResolver {
  // @ts-ignore
  @Query(() => String)
  hello() {
    return 'Hello sunshine'
  }
}

const main = async () => {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  })

  const server = new ApolloServer({ schema })
  await server.start()

  const app = Express()
  server.applyMiddleware({ app })

  await app.listen({ port: PORT }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  )

  return { server, app }
}

main()

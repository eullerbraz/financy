import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import express from 'express';
import { buildSchema, Query, Resolver } from 'type-graphql';

const PORT = 4000;

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    return 'Hello, world!';
  }
}

async function bootstrap() {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  );

  const schema = await buildSchema({
    resolvers: [HelloResolver],
    validate: false,
    emitSchemaFile: './schema.graphql',
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

bootstrap();

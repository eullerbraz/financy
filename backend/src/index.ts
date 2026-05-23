import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
import express from 'express';
import { buildSchema } from 'type-graphql';

import { buildContext } from './graphql/context';
import { AuthResolver } from './resolvers/auth.resolver';
import { CategoryResolver } from './resolvers/categories.resolver';

const PORT = 4000;

async function bootstrap() {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  );

  const schema = await buildSchema({
    resolvers: [AuthResolver, CategoryResolver],
    validate: false,
    emitSchemaFile: './schema.graphql',
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();

  app.use(
    '/graphql',
    express.json(),

    expressMiddleware(server, {
      context: buildContext,
    }),
  );

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/graphql`);
  });
}

bootstrap();

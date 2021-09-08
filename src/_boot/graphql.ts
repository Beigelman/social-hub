import { makeModule } from '@/context';
import { makeSchemaStorage } from '@/_lib/graphql/resolver';
import { asValue } from 'awilix';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const graphql = makeModule('graphql', async ({ app: {onBooted}, container: { build, register } }) => {
  const {getModuleData, registerModule } = build(makeSchemaStorage);

  onBooted(async () => {
    const { queries, mutations } = getModuleData();

    build(({server}) => {
      server.use(
      '/graphql',
      graphqlHTTP({
        schema: new GraphQLSchema({
          query: new GraphQLObjectType<any>({
            name: 'Query',
            description: 'The root of all queries',
            fields: () => ({
              ...queries
            }),
          }),
        }),
        graphiql: process.env.NODE_ENV !== 'production',
      })
    );
    });
  }, "prepend");

  register({
    registerModule: asValue(registerModule),
  });
});

type GraphQLRegistry = {
  registerModule: ReturnType<typeof makeSchemaStorage>["registerModule"]
}

export { graphql };
export type { GraphQLRegistry };
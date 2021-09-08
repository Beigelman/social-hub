import { GraphQLFieldConfigMap, GraphQLNonNull, GraphQLID } from 'graphql';

import { FindPages } from '../../query/FindPage';
import { PageType } from './gqlTypes/PageType';

type Dependencies = {
  findPage: FindPages;
};

type FacebookGQLQueries = GraphQLFieldConfigMap<any, any>;

const makeFacebookGQLQueries = ({ findPage }: Dependencies): FacebookGQLQueries => ({
  page: {
    type: PageType,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLID),
      },
    },
    resolve: findPage,
  },
});

export { makeFacebookGQLQueries };
export type { FacebookGQLQueries };

import { Resolver } from '@/_lib/graphql/resolver';

import { FindPages } from '../../query/FindPage';

type Dependencies = {
  findPages: FindPages;
};

const facebookResolvers: Resolver = ({ findPages }: Dependencies) => ({
  Query: {
    findPages: ({ id }) => findPages({ id }),
  },
  Mutation: {},
});

export { facebookResolvers };

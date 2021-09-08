type ResolverBody = {
  Query?: {
    [key: string]: any;
  };
  Mutation?: {
    [key: string]: any;
  };
};

type Resolver = (resolverProps: any) => ResolverBody;

export { Resolver };

import { asValue } from 'awilix';
import { Resolver } from 'awilix/lib/resolvers';

type Values = Record<string, any>;

type ContainerValues = <Type extends Values>(values: Type) => { [key in keyof Type]: Resolver<Type[key]> };

const toContainerValues: ContainerValues = values =>
  Object.entries(values).reduce((acc: any, [key, collection]) => ({ ...acc, [key]: asValue(collection) }), {});

export { toContainerValues };

import { createContainer } from 'awilix';

import { MainRegistry } from '@/_boot';
import { AppModulesRegistry } from '@/_boot/appModules';
import { DatabaseRegistry } from '@/_boot/database';
import { PubSubRegistry } from '@/_boot/pubSub';
import { ServerRegistry } from '@/_boot/server';

type Registry = MainRegistry & DatabaseRegistry & ServerRegistry & PubSubRegistry & AppModulesRegistry;

const container = createContainer<Registry>();

type Container = typeof container;

export { container };
export type { Container, Registry };

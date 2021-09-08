import { facebookModule, FacebookRegistry } from '@/modules/facebook';

type AppModulesMessages = {};

type AppModulesConfig = {};

const appModules = [facebookModule];

type AppModulesRegistry = FacebookRegistry;

export { appModules };
export type { AppModulesMessages, AppModulesConfig, AppModulesRegistry };

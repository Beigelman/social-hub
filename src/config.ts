import { AppModulesConfig } from '@/_boot/appModules';
import { DatabaseConfig } from '@/_boot/database';
import { REPLConfig } from '@/_boot/repl';
import { ServerConfig } from '@/_boot/server';
import { SwaggerConfig } from '@/_boot/swagger';
import { environment, EnvironmentConfig, envNumber, envString } from '@/_lib/Environment';

type Configuration = ServerConfig & DatabaseConfig & EnvironmentConfig & REPLConfig & SwaggerConfig & AppModulesConfig;

const config: Configuration = {
  appName: 'node-arch',
  cli: process.argv.includes('--cli'),
  environment: environment(),
  repl: {
    port: envNumber('REPL_PORT', 2580),
  },
  http: {
    host: envString('HOST', 'localhost'),
    port: envNumber('PORT', 3000),
  },
  swagger: {
    title: 'Blog API',
    version: '1.0.0',
    basePath: '/api',
    docEndpoint: '/api-docs',
  },
  mongodb: {
    database: envString('DB_NAME', 'blog'),
    host: envString('DB_HOST', 'mongodb://localhost:27017'),
    username: envString('DB_USER', 'blog'),
    password: envString('DB_PASS', 'blog'),
  },
};

export { config };
export type { Configuration };

import * as Messages from './messages.json';
import { registerAs } from '@nestjs/config';
import { join } from 'node:path';

const ROOT = process.cwd();

const pathsConfig = {
  /**
   * The path where logs will be stored.
   */
  logsPath: join(ROOT, 'logs'),
};

const messagesConfig = {
  /**
   * Welcome message for the index route.
   */
  indexWelcome: Messages.en.indexWelcome,
};

const applicationConfig = {
  /**
   * Configuration for application paths.
   */
  paths: pathsConfig,

  /**
   * Configuration for application messages.
   */
  messages: messagesConfig,

  /**
   * Additional configuration can be added here as needed.
   * For example:
   * - Database configuration
   * - External API keys
   * - Feature flags
   */
};

type AppConfig = typeof applicationConfig;

/**
 * Registers the application configuration using NestJS Config Module.
 * This configuration can be accessed throughout the application using `@Inject(ConfigService)` or `@Inject(CONFIG_TOKEN)`.
 */
export default registerAs<AppConfig>(
  'default',
  (): AppConfig => applicationConfig,
);

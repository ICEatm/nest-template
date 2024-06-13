import DefaultConfig from '@config/default.config';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

/**
 * The ConfigLoaderModule is responsible for loading and configuring
 * the application's settings using the NestJS ConfigModule.
 *
 * This module ensures that the configuration is globally available
 * throughout the application.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [DefaultConfig],
    }),
  ],
})
export class ConfigLoaderModule {}

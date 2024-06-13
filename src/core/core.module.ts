import { MiddlewareLoaderModule } from '@common/modules/middleware-loader.module';
import { ProviderLoaderModule } from '@common/modules/provider-loader.module';
import { ConfigLoaderModule } from '@common/modules/config-loader.module';
import { ModuleLoaderModule } from '@common/modules/module-loader.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MiddlewareLoaderModule,
    ConfigLoaderModule,
    ProviderLoaderModule,
    ModuleLoaderModule,
  ],
})
export class CoreModule {}

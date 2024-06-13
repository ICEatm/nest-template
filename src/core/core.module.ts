import { MiddlewareLoaderModule } from 'src/common/modules/middleware-loader.module';
import { ProviderLoaderModule } from 'src/common/modules/provider-loader.module';
import { ConfigLoaderModule } from 'src/common/modules/config-loader.module';
import { ModuleLoaderModule } from 'src/common/modules/module-loader.module';
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

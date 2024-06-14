import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set `/api` as the global prefix
  // except for the `/` index page
  app.setGlobalPrefix('api', { exclude: ['/'] });

  /**
   * Enable versioning by setting it the type to uri
   * To use this import `Version` from `@nestjs/common`
   *
   * To call it on the browser request
   * http://localhost:<PORT>/api/v1/cats
   *
   * @example
   * ```typescript
   * import { Get, Version, Controller } from '@nestjs/common';
   *
   * @Controller('cats')
   * export class IndexController {
   *  @Get()
   *  @Version('1')
   *  getIndex() {
   *    return 'Cats';
   *  }
   * }
   * ```
   */
  app.enableVersioning({ type: VersioningType.URI });

  await app.listen(3000);
}
bootstrap();

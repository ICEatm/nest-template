import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set `/api` as the global prefix, except for the `/` index page
  app.setGlobalPrefix('api', { exclude: ['/'] });

  /**
   * Enable versioning with the URI type.
   *
   * Example usage:
   * To call the endpoint in the browser:
   * http://localhost:<PORT>/api/v1/cats
   *
   * @example
   * ```typescript
   * import { Get, Version, Controller } from '@nestjs/common';
   *
   * @Controller('cats')
   * export class IndexController {
   *   @Get()
   *   @Version('1')
   *   getIndex() {
   *     return 'Cats';
   *   }
   * }
   * ```
   *
   * For more information visit this resource
   * @see https://docs.nestjs.com/techniques/versioning
   */
  app.enableVersioning({ type: VersioningType.URI });

  await app.listen(3000);
}
bootstrap();

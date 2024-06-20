import { VersioningType, INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set `/api` as the global prefix, except for the `/` index page
  app.setGlobalPrefix((process.env.PREFIX as string) ?? 'api', {
    exclude: ['/'],
  });

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

  /**
   * Sets up Swagger configuration and documentation for the application.
   *
   * This function initializes the Swagger documentation for the application using the SwaggerModule
   * and DocumentBuilder from the NestJS framework. It configures the Swagger document with the
   * title, description, and version, which can be provided through environment variables or default
   * to specified strings if not provided.
   *
   * @remarks
   * The Swagger documentation is an essential tool for documenting and testing the API. It provides
   * a user-friendly interface to explore the endpoints, parameters, and responses. This setup ensures
   * that the Swagger documentation is available at the `/docs` endpoint of the application.
   *
   * @example
   * ```typescript
   * const app = await NestFactory.create(AppModule);
   * setupSwagger(app);
   * await app.listen(3000);
   * ```
   *
   * @param app - The NestJS application instance.
   *
   * @returns void
   */
  const setupSwagger = (app: INestApplication): void => {
    const swaggerConfig = new DocumentBuilder()
      .setTitle((process.env.SWAGGER_TITLE as string) ?? 'Swagger Title')
      .setDescription(
        (process.env.SWAGGER_DESCRIPTION as string) ?? 'Swagger Description',
      )
      .setVersion((process.env.SWAGGER_VERSION as string) ?? '1.0')
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(
      (process.env.SWAGGER_BASE_PATH as string) ?? '/docs',
      app,
      swaggerDocument,
    );
  };

  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();

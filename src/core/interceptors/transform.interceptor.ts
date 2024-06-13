import {
  ExecutionContext,
  NestInterceptor,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
/**
 * TransformInterceptor is a NestJS interceptor that transforms the response
 * data structure by wrapping it in an object with a `data` property.
 *
 * This interceptor can be applied to controllers or routes to ensure a consistent
 * response format across the application.
 *
 * @example
 * Applying the interceptor to a controller:
 * ```typescript
 * @UseInterceptors(TransformInterceptor)
 * @Controller('example')
 * export class ExampleController {
 *   @Get()
 *   findAll(): string[] {
 *     return ['example1', 'example2'];
 *   }
 * }
 * // The response will be transformed to: { data: ['example1', 'example2'] }
 * ```
 *
 * @template T The type of the data being transformed.
 */
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  /**
   * Intercepts the outgoing response and transforms it by wrapping the data in an object
   * with a `data` property.
   *
   * @param _ - The execution context of the request.
   * @param next - The call handler to handle the next interceptor or the route handler.
   * @returns An Observable of the transformed response.
   */
  intercept(
    _: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}

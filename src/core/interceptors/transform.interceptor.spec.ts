import { TransformInterceptor } from './transform.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { of } from 'rxjs';

describe('TransformInterceptor', () => {
  let interceptor: TransformInterceptor<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransformInterceptor],
    }).compile();

    interceptor = module.get<TransformInterceptor<any>>(TransformInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should transform the response', (done) => {
    const callHandler: CallHandler = {
      handle: jest.fn(() => of('test data')),
    };

    const executionContext: ExecutionContext = {} as ExecutionContext;
    interceptor.intercept(executionContext, callHandler).subscribe({
      next: (value) => {
        expect(value).toEqual({ data: 'test data' });
        done();
      },
    });
  });
});

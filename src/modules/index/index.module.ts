import { Module } from '@nestjs/common';
import { IndexController } from './index.controller';
import { IndexService } from './index.service';

@Module({
  controllers: [IndexController],
  providers: [IndexService],
})
export class IndexModule {}

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { IndexService } from './index.service';

@ApiTags('Index')
@Controller()
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get()
  @ApiOperation({
    summary: 'Get Index',
    description: 'Retrieves the index information.',
  })
  @ApiResponse({ status: 200, description: 'Successful response.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  getIndex() {
    return this.indexService.getIndex();
  }
}

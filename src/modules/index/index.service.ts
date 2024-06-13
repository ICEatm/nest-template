import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IndexService {
  constructor(private readonly configService: ConfigService) {}

  getIndex() {
    return {
      success: true,
      message: this.configService.get('default.messages.indexWelcome'),
    };
  }
}

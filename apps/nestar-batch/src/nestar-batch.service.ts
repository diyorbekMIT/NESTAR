import { Injectable } from '@nestjs/common';

@Injectable()
export class NestarBatchService {
  getHello(): string {
    return 'Welcome to Nestar-batch api Sever!';
  }
}

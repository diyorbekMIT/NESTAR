import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';
import FollowSchema from '../../schemas/Follow.model';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';

@Module({
    imports: [
        MongooseModule.forFeature([
          {
            name: 'Follow', // Corrected to match the service injection
            schema: FollowSchema,
          },
        ]),
          AuthModule,
          MemberModule
      ],
    providers: [FollowResolver, FollowService],
    exports: [FollowService],
})
export class FollowModule {}

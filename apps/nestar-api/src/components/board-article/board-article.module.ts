import { Module } from '@nestjs/common';
import { BoardArticleResolver } from './board-article.resolver';
import { BoardArticleService } from './board-article.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import BoardArticleSchema from '../../schemas/BoardArticle.model';
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { PropertyModule } from '../property/property.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "BroadArticle",
        schema: BoardArticleSchema,
      }
    ]),
    AuthModule,
    MemberModule,
    PropertyModule
  ],
  providers: [BoardArticleResolver, BoardArticleService],
  exports: [BoardArticleService]
})
export class BoardArticleModule {}

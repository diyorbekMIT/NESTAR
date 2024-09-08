import { Module } from '@nestjs/common';
import { BoardArticleResolver } from './board-article.resolver';
import { BoardArticleService } from './board-article.service';
import { MongooseModule } from '@nestjs/mongoose';
import BoardArticleSchema from '../../schemas/BoardArticle.model'; // Ensure the correct schema import
import { AuthModule } from '../auth/auth.module';
import { MemberModule } from '../member/member.module';
import { PropertyModule } from '../property/property.module';
import { View } from '../../libs/dto/view/view';
import { ViewModule } from '../view/view.module';
import { LikeModule } from '../like/like.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'BoardArticle', // Corrected to match the service injection
        schema: BoardArticleSchema,
      },
    ]),
    AuthModule,
    MemberModule,
    ViewModule,
    LikeModule
  ],
  providers: [BoardArticleResolver, BoardArticleService],
  exports: [BoardArticleService],
})
export class BoardArticleModule {}

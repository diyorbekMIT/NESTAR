import { Module } from '@nestjs/common';
import { PropertyResolver } from './property.resolver';
import { PropertyService } from './property.service';
import MemberSchema from '../../schemas/Member.model';
import { ViewModule } from '../view/view.module';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MemberModule } from '../member/member.module';

@Module({
  imports:  [MongooseModule.forFeature([{ name: 'Property', schema: MemberSchema }]), AuthModule, ViewModule, MemberModule],
  providers: [PropertyResolver, PropertyService]
})
export class PropertyModule {}

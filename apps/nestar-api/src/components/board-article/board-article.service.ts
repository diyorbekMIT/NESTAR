import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Property } from '../../libs/dto/property/property';
import { Model } from 'mongoose';

@Injectable()
export class BoardArticleService {
    constructor(@InjectModel("BroadArticle") private readonly boardArticleModel: Model<Property>) {}
    
}

import { Schema } from "mongoose";
import { MemberAuthType, MemberStatus, MemberType } from "../libs/enums/member.enum";

const MemberSchema = new Schema ({
    MemberType: {
        type: String,
        enum: MemberType,
        default: MemberType.USER
    },

    memberStatus: {
        type: String,
        enum: MemberStatus,
        default: MemberStatus.ACTIVE
    },

    MemberAuthType: {
        type: String,
        enum: MemberAuthType,
        default: MemberAuthType.PHONE
    },
    memberPhone: {
        type: String,
        required: true,
        index: {unique: true, sparse: true}
    },

    memberNick: {
        type: String,
        index: {unique: true, sparse: true},
        required: true
    },

    memberPassword: {
        type: String,
        required: true,
        select: false
    },

    memberFullName: {
        type: String
    },
    memberImage: {
        type: String,
        default: ``,
    },
    
    memberAddress: {
        type: String,
      },
  
      memberDesc: {
        type: String,
      },
  
      memberProperties: {
        type: Number,
        default: 0,
      },
  
      memberArticles: {
        type: Number,
        default: 0,
      },
  
      memberFollowers: {
        type: Number,
        default: 0,
      },
  
      memberFollowings: {
        type: Number,
        default: 0,
      },
  
      memberPoints: {
        type: Number,
        default: 0,
      },
  
      memberLikes: {
        type: Number,
        default: 0,
      },
      memberViews: {
        type: Number,
        default: 0,
      },
      memberComments: {
        type: Number,
        default: 0,
      },
      memberRank: {
        type: Number,
        default: 0,
      },
      memberWarnings: {
        type: Number,
        default: 0,
      },
      memberBlocks: {
        type: Number,
        default: 0,
      },
      deletedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
      collection: 'members',

})
import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UseGuards} from '@nestjs/common';
import { AgentsInquiry, LoginInput, MemberInput, MembersInquiry } from '../../libs/dto/member/member.input';
import { Member, Members } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';
import { MemberUpdate } from '../../libs/dto/member/member.update';
import { WithoutGuard } from '../auth/guards/without.guard';
import { shapeIntoMongoObjectId } from '../../libs/config';



@Resolver()
export class MemberResolver {
    constructor(private readonly memberService: MemberService) {}

    @Mutation(() => Member)
    public async signup(@Args('input') input: MemberInput): Promise<Member> {
        console.log("Mutation: signup");
        console.log("input:", input);
        return this.memberService.signup(input);
       
    }

    @Mutation(() => Member)
    public async login(@Args('input') input: LoginInput): Promise<Member> {
       
        console.log("Mutation:", input);
        console.log("input:", input);
        return this.memberService.login(input);
    }
     
    @UseGuards(AuthGuard)
    @Query(() => String)
    public async checkAuth(@AuthMember("memberNick") memberNick: string): Promise<string> {
        console.log("Query: checkAuthRoles");
        console.log("data: ", memberNick)
        return `Hi  ${memberNick}`;
    }

     
     
      @Roles(MemberType.USER, MemberType.AGENT)
      @UseGuards(RolesGuard)
      @Query(() => String)
      public async checkAuthRoles(@AuthMember("memberNick") memberNick: string): Promise<string> {
          console.log("Mutation: updateMember");
          console.log("data: ", memberNick)
          return `Hi  ${memberNick}`;
      }
      
      @UseGuards(AuthGuard)
    @Mutation(() => Member)
    public async updateMember(@Args("input") input: MemberUpdate, 
    @AuthMember('_id') memberId: ObjectId): Promise<Member> {
        console.log("memberId:", memberId)
        delete input._id
        return await this.memberService.updateMember(memberId, input);
    }

    
    

    @UseGuards(WithoutGuard)
    @Query(() => Member)
    public async getMember(@Args("memberId") input: string, @AuthMember('_id') memberId: ObjectId)
    : Promise<Member> {
        console.log("Query: getMember");
        const targetId = shapeIntoMongoObjectId(input);
        return await this.memberService.getMember(memberId, targetId);
    }

    @UseGuards(WithoutGuard)
    @Query(() => Members)
    public async getAgents(@Args('input') input: AgentsInquiry, @AuthMember('_id')
        memberId: ObjectId
    ): Promise<Members> {
       console.log("Query: getAgents"); 
       return await this.memberService.getAgents(memberId, input);
    }


    /**ADMIN */
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Query(() => Members)
    public async getAllMembersByAdmin(@Args('input') input: MembersInquiry): Promise<Members> {
        console.log("Query: getAllMembersByAdmin");
        return await this.memberService.getAllMembersByAdmin(input);
    }

    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => Member)
    public async updateMemberByAdmin(@Args('input') input: MemberUpdate): Promise<Member> {
        console.log("Mutation updateMemberByAdmin");
       return await this.memberService.updateMemberByAdmin(input);
    }

    
}

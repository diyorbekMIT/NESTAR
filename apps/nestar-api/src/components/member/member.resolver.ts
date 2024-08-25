import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { InternalServerErrorException, UseGuards} from '@nestjs/common';
import { LoginInput, MemberInput } from '../../libs/dto/member/member.input';
import { Member } from '../../libs/dto/member/member';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthMember } from '../auth/decorators/authMember.decorator';
import { ObjectId } from 'mongoose';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { MemberType } from '../../libs/enums/member.enum';



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
    @Mutation(() => String)
    public async updateMember(@AuthMember("_id") memberId: ObjectId): Promise<string> {
        console.log("Mutation: updateMember");
        console.log("data: ", memberId)
        return this.memberService.updateMember();
    }

    @Query(() => String)
    public async getMember(): Promise<string> {
        console.log("Query: getMember");
        return this.memberService.getMember();
    }

    /**ADMIN */
    @Roles(MemberType.ADMIN)
    @UseGuards(RolesGuard)
    @Mutation(() => String)
    public async getAllMembersByAdmin(): Promise<string> {
        return "";
    }
}

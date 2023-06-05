import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
    @Field()
    username: string;

    @Field()
    password: string;
    
    @Field({nullable: true})
    displayName?: string;

    @Field({nullable: true})
    email?: string;

    @Field({nullable: true})
    address?: string;
    
    @Field({nullable: true})
    district?: string;
    
    @Field({nullable: true})
    occupation?: string;
    
    @Field({nullable: true})
    city?: string;
    
    @Field({nullable: true})
    gender?: string;
    
    @Field({nullable: true})
    country?: string;
    
    @Field({nullable: true})
    phone?: string;

    @Field(()=> Int, {nullable: true})
    userScore?: number;

    @Field(()=> Int, {nullable: true})
    helperCount?: number;

    @Field({nullable: true})
    dateOfBirth?: Date;
}
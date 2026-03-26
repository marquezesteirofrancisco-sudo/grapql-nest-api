import { Field, Int, ObjectType } from "@nestjs/graphql";

 
@ObjectType( {description:'todo agregation'} )
export class  AggregationsType{

    @Field(() => Int)
    total :number;

    @Field(() => Int)
    pending : number;

    @Field(() => Int)
    completed: number;

    @Field(() => Int , { deprecationReason: 'no utilizar'})
    totalTodosCompleted: number;



}
import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Max, MaxLength } from "class-validator";

@InputType()
export class CreateTodoInput {

    @Field( () => String, { description: 'La descripcion de la tarea' } )
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    description: string;
  
}
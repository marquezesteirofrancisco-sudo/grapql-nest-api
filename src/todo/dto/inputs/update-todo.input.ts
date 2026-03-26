import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

@InputType()
export class UpdateTodoInput {

    @Field( () => Int, { description: 'El ID de la tarea a actualizar' } )
    @IsInt()
    @Min(1)
    id: number;

    @Field( () => String, { description: 'La descripcion de la tarea' , nullable: true } )
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @IsOptional()
    description?: string;

    @Field( () => Boolean, { description: 'Indica si la tarea esta completada o no', nullable: true } )
    @IsOptional()
    done?: boolean;

  
}
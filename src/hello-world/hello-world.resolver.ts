import { Float, Query, Resolver, Int , Args} from '@nestjs/graphql';

@Resolver()
export class HelloWorldResolver {

    @Query(() => String, {description: 'Devuelve un saludo', name: 'hola_mundo'})
    helloWorld(): string {
        return 'Hello World!!!!';
    }

    @Query( () => Float, {description:'esto es la descripcion', name: 'numero_aleatorio'})
    numeroAleatorio(): number {
        return Math.random() * 100;
    }

    @Query( () => Int, {description:'Devuelve un numero entero aleatorio de 0 a 10 ', name: 'randomFromZeroTo'})
    getNumberFromZeroTo( @Args('to', {type: () => Int, nullable: true}) to : number = 6 ): number {
        return Math.floor(Math.random() * to)
    }

}

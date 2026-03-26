import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';

@Resolver()
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService

    ) {}

    @Query(() => [Todo], { name: 'todos', description: 'Get all todos' })
    findAll() : Todo[] {
        return this.todoService.findAll();
    }

    @Query(()=> Todo, { name:'todo', description: 'Get a todo by id'})
    findOne( @Args('id', {type: () => Int, nullable: false}) id) {
        return this.todoService.findOne(id);
        
    }

    @Mutation(() => Todo, { name: 'createTodo', description: 'Create a new todo' })
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput  
    ) {

        console.log({createTodoInput});

        return this.todoService.create(createTodoInput);
    }

    @Mutation(() => Todo, { name: 'updateTodo', description: 'Update an existing todo' })
    updateTodo(
        @Args('updateTodoInput') updateTodoInput: UpdateTodoInput  
    ) {
        return this.todoService.update(updateTodoInput);
    }

    removeTodo(id: string) {
        return { id, title: `Todo ${id}`, completed: false };
    }


}

import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';
import { AggregationsType } from './type/aggregations.type';

@Resolver(() => Todo)
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService

    ) {}

    @Query(() => [Todo], { name: 'todos', description: 'Get all todos' })
    findAll(

        //@Args('listTodoArgs', { type: () => ListTodoArgs, nullable: true }) listTodoArgs: ListTodoArgs

        @Args() statusArgs: StatusArgs

    ) : Todo[] {
        return this.todoService.findAll(statusArgs);
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
        return this.todoService.update(updateTodoInput.id, updateTodoInput);
    }

    @Mutation(() => Boolean, { name: 'removeTodo', description: 'Remove a todo by id.' })
    removeTodo(
        @Args('id', { type: () => Int, nullable: false }) id: number
    ) {
        return this.todoService.delete(id);
    }

    // Agregations
    @Query( ()=> Int , {name:'totalTodos'})
    totalTodos() : number {
        return this.todoService.getTotalTodos;
    }

    //CompletedTodos
    @Query( ()=> Int , {name:'completedTodos'})
    completedTodos() : number {
        return this.todoService.getCompletedTodos;
    }

    //PendingTodos
    @Query( ()=> Int , {name:'pendingTodos'})
    pendingTodos() : number {
        return this.todoService.getPendingTodos;
    }

    @Query( ()=> AggregationsType)
    aggregations() : AggregationsType
    {
        return {
            completed: this.todoService.getCompletedTodos,
            pending: this.todoService.getPendingTodos,
            total: this.todoService.getTotalTodos,
            totalTodosCompleted: this.todoService.getTotalTodos
        }
    }
}

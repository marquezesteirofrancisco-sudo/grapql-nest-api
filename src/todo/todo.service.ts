import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';
import { StatusArgs } from './dto/args/status.args';

@Injectable()
export class TodoService {


    private todos: Todo[] = [
        { id: 1, description: 'Learn NestJS', done: false },
        { id: 2, description: 'Build a GraphQL API', done: true },
        { id: 3, description: 'Deploy the application', done: false },
        { id: 4, description: 'OTra the application', done: false },
    ];

    get getTotalTodos() {
        return this.todos.length;
    }

    get getCompletedTodos() {
        return this.todos.filter(todo => todo.done === true).length;
    }

    get getPendingTodos() {
        return this.todos.filter(todo => todo.done === false).length;
    }

    getTodosFiltered(done?: boolean) : number {

        if (done === undefined)
            return this.todos.length;

        return this.todos.filter(todo => todo.done === done).length;
    }

    findAll(statusArgs: StatusArgs ): Todo[] {

        if (statusArgs.status !== undefined) {
            return this.todos.filter(todo => todo.done === statusArgs.status);
        }

        return this.todos;
    }

    findOne(id: number): Todo {

        const todo = this.todos.find(todo => todo.id === id);

        if (!todo) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }

        return todo;
    }

    create(createTodoInput: CreateTodoInput): Todo {

        const todo: Todo = {
            id: this.todos.length + 1,
            description: createTodoInput.description,
            done: false
        };
        this.todos.push(todo);
        return todo;
    }

    update(id: number, updateTodoInput: UpdateTodoInput) {

        const {description, done} = updateTodoInput;

        const todo = this.findOne(id);  

        if (description) {
            todo.description = description;
        }

        if (done !== undefined) {
            todo.done = done;
        }

        this.todos = this.todos.map(t => t.id === id ? todo : t);

        return todo;
    }

    delete(id: number): Boolean {

        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) {
            throw new NotFoundException(`Todo with id ${id} not found`);
        }

        this.todos.splice(index, 1);
        return true;
    }

 

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';

@Injectable()
export class TodoService {


    private todos: Todo[] = [
        { id: 1, description: 'Learn NestJS', done: false },
        { id: 2, description: 'Build a GraphQL API', done: false },
        { id: 3, description: 'Deploy the application', done: false },
    ];

    findAll(): Todo[] {
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

    update(updateTodoInput: UpdateTodoInput) {

        const {id, description, done} = updateTodoInput;

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
}

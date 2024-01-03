import { Todo } from '../models/todo.model';
import { createTodoHTML } from './create-todo-html';

/**
 * 
 * @param {String} elementId
 * @param {Array<Todo>} todos 
 */
export const renderTodos = ( elementId, todos = [] ) => {

    console.log(elementId);
    todos.forEach( todo => {
        const element = document.querySelector( elementId );
        element.append( createTodoHTML(todo) );
    });
}
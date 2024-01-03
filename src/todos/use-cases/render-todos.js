import { Todo } from '../models/todo.model';
import { createTodoHTML } from './create-todo-html';

/**
 * Renderiza listado de Todos
 * @param {String} elementId 
 * @param {Array<Todo>} todos 
 */
export const renderTodos = ( elementId, todos = [] ) => {

    // TODO: referencia
    const element = document.querySelector( elementId );

    todos.forEach( todo => {
        element.append( createTodoHTML(todo) );
    });
}
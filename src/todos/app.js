import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases/';

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input'
};

/**
 * Renderiza nuestra app
 * @param {String} elementId donde se renderiza nuestra app
 */
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoUL = document.querySelector( ElementIDs.TodoList );

    // Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        
        if ( event.keyCode !== 13 ) return;

        if ( event.target.value.trim().length === 0) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
    });

    todoUL.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id') );

        displayTodos();
    });

}
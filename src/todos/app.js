import todoStore from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos } from './use-cases';

const ElementIDs = {
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
};

/**
 * Renderiza la app
 * @param {String} elementId elemento en el cual se renderiza la app
 */
export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos);
    }

    // Cuando la función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();

    // Referencias HTML
    const newDescriptionInput = document.querySelector( ElementIDs.newTodoInput );
    const todoListUL = document.querySelector( ElementIDs.TodoList );

    // Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        if ( event.keyCode !== 13 ) return;

        if ( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');

        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    todoListUL.addEventListener('click', ( event ) => {
        
        const element = event.target.closest('[data-id]');

        if ( !element || event.target.classList.value !== 'destroy' ) return;

        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos();
    });
}
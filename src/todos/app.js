import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderTodos, renderPending } from './use-cases';

const ElementIDs = {
    ClearCompleted: '.clear-completed',
    TodoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    TodoFilters: '.filter',
    PendingCountLabel: '#pending-count',
};

/**
 * Renderiza la app
 * @param {String} elementId elemento en el cual se renderiza la app
 */
export const App = ( elementId ) => {

    const pendingCount = () => {
        const pendingCountStrong = document.querySelector( ElementIDs.PendingCount );
        const todos = todoStore.getTodos( Filters.Pending );
        const pending = todos.length;
        pendingCountStrong.innerText = pending;
    }

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos);
        
        updatePendingCount();
    }

    const updatePendingCount = () => {
        renderPending( ElementIDs.PendingCountLabel );
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
    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompleted );
    const filtersLIs = document.querySelectorAll( ElementIDs.TodoFilters );

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

    clearCompletedButton.addEventListener('click', ( event ) => {
        todoStore.deleteCompleted();
        displayTodos();
    });

    filtersLIs.forEach(element => {
        
        element.addEventListener('click', () => {

            filtersLIs.forEach(element => element.classList.remove('selected'));
            element.classList.add('selected');

            switch(element.textContent) {
                case 'Todos':
                    todoStore.setFilter( Filters.All );
                break;
                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                break;
                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                break;
            }

            displayTodos();
        });
    });
}
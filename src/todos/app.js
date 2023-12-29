import html from './app.html?raw';

/**
 * Renderiza la app
 * @param {String} elementId elemento en el cual se renderiza la app
 */
export const App = ( elementId ) => {

    // Cuando la función App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
    })();
}
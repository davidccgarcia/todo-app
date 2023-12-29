import html from './app.html?raw';

/**
 * Renderiza nuestra app
 * @param {String} elementId donde se renderiza nuestra app
 */
export const App = ( elementId ) => {

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
    })();

}
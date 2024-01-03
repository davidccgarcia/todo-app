import { Todo } from '../models/todo.model';

/**
 * Crea el elemento HTML para mostrar los TODOS
 * @param {Todo} todo 
 * @returns liHTMLElement
 */
export const createTodoHTML = ( todo ) => {
    if ( !todo ) throw new Error('A TODO object is required.');

    const html = `<h1>${ todo.description }</h1>`;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;

    return liElement;
}
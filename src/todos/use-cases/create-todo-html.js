import { Todo } from '../models/todo.model';

/**
 * Crea el elemento HTML para renderizar el TODO
 * @param {Array<Todo>} todo 
 * @returns liElement 
 */
export const createTodoHTML = ( todo ) => {
    if ( !todo ) throw new Error('A TODO Object is required.');

    const html = `<h1>${ todo.description }</h1>`;
    const liElement = document.createElement('li');
    liElement.innerHTML = html;

    return liElement;
}
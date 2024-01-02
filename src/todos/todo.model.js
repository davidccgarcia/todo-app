export class Todo {
    /**
     * Crea el Todo
     * @param {String} description del Todo
     */
    constructor( description ){
        this.id = 1;
        this.description = description;
        this.done = false;
        this.createdAt = new Date();
    }
}

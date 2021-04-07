import { BehaviorSubject } from "rxjs";

/**
 * Represents a list that holds tasks.
 */
export default class List {
    /**
     * @param {*} listData a row in the database that represents a list.
     */
    constructor(listData) {
        this.tasks = [];
        this.id = listData.id;
        this.name = new BehaviorSubject(listData.name);
    }
}

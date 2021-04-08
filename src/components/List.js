import { BehaviorSubject } from "rxjs";
import Task from "./Task";

/**
 * Represents a list that holds tasks.
 */
export default class List {
    /**
     * @param {Object} listData a row in the database that represents a list.
     */
    constructor(listData) {
        this.id = listData.id;
        this.name = new BehaviorSubject(listData.name);
        this.tasks = new BehaviorSubject([
            new Task({
                id: 1,
                list_id: 1,
                name: "Test Task",
                description: "sadfdsa",
            }),
        ]);
    }

    getTaskByID(taskID) {
        for (let task of this.tasks.getValue()) {
            if (task.id == taskID) return task;
        }
    }
}

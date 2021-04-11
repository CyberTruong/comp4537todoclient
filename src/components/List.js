import { BehaviorSubject } from "rxjs";
import Task from "./Task";
import APIService from "../services/ApiService";

/**
 * Represents a list that holds tasks.
 */
export default class List {
    /**
     * @param {Object} listData a row in the database that represents a list.
     */
    constructor(listData) {
        this.id = listData.id;
        this.name = new BehaviorSubject(
            listData.name ? listData.name : "New List"
        );
        this.tasks = new BehaviorSubject([]);
    }

    getTaskByID(taskID) {
        const result = this.tasks
            .getValue()
            .filter((task) => task.id == taskID);
        if (result) return result[0];
    }

    getProperties() {
        return {
            id: this.id,
            name: this.name.getValue(),
        };
    }

    async updateList() {
        await APIService.updateList(this);
    }

    async getTasks() {
        this.tasks.next([]);
        const tasksData = await APIService.getTasks(this);
        if (tasksData) this.tasks.next(tasksData.map((task) => new Task(task)));
    }

    async createTask() {
        await APIService.createTask(this);
        this.getTasks();
    }

    async deleteTask(task) {
        await APIService.deleteTask(task);
        this.getTasks();
    }
}

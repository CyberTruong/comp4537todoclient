import { BehaviorSubject } from "rxjs";
import APIService from "../services/ApiService";

/**
 * Represents a task instance.
 */
export default class Task {
    /**
     *
     * @param {Object} taskData a row in the database that represents a task.
     */
    constructor(taskData) {
        this.id = taskData.id;
        this.list_id = taskData.list_id;
        this.name = new BehaviorSubject(
            taskData.name ? taskData.name : "Enter Task Name"
        );
        this.description = new BehaviorSubject(
            taskData.description ? taskData.description : " "
        );
    }

    getProperties() {
        return {
            id: this.id,
            list_id: this.list_id,
            name: this.name.getValue(),
            description: this.description.getValue(),
        };
    }

    async updateTask(task) {
        await APIService.updateTask(task);
    }
}

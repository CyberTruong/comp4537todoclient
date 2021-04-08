import { BehaviorSubject } from "rxjs";

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
        this.name = new BehaviorSubject(taskData.name);
        this.description = new BehaviorSubject(taskData.description);
    }

    getProperties() {
        return {
            id = this.id,
            list_id: this.list_id,
            name: this.name.getValue(),
            description: this.description.getValue()
        }
    }
}

/**
 * Handles API calls.
 */
export default class APIService {
    /**
     * Gets all lists in the database.
     */
    static async getLists() {}

    /**
     * Creates a new list in the database.
     */
    static async createList() {}

    /**
     * Updates a list.
     * @param {List} list List object that holds the new updates.
     */
    static async updateList(list) {}

    /**
     * Deletes a list.
     * @param {List} list List object that holds the id needed to delete the list.
     */
    static async deleteList(list) {}

    /**
     * Gets all tasks based on the list.
     * @param {List} list List object that holds the id needed to fetch tasks.
     */
    static async getTasks(list) {}

    /**
     * Creates an empty new task in the specified list.
     * @param {List} list
     */
    static async createTask(list) {}

    /**
     * Updates specified task.
     * @param {Task} task The task instance to be updated
     */
    static async updateTask(task) {}

    /**
     * Deletes the specified task.
     * @param {Task} task
     */
    static async deleteTask(task) {}
}

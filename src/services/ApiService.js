/**
 * Handles API calls.
 */
export default class APIService {
    /**
     * Gets all lists in the database.
     */
    async getLists() {}

    /**
     * Creates a new list in the database.
     */
    async createList() {}

    /**
     * Updates a list.
     * @param {List} list List object that holds the new updates.
     */
    async updateList(list) {}

    /**
     * Deletes a list.
     * @param {List} list List object that holds the id needed to delete the list.
     */
    async deleteList(list) {}

    /**
     * Gets all tasks based on the list.
     * @param {List} list List object that holds the id needed to fetch tasks.
     */
    async getTasks(list) {}

    /**
     * Creates an empty new task in the specified list.
     * @param {List} list
     */
    async createTask(list) {}

    /**
     * Updates specified task.
     * @param {Task} task The task instance to be updated
     */
    async updateTask(task) {}

    /**
     * Deletes the specified task.
     * @param {Task} task
     */
    async deleteTask(task) {}
}

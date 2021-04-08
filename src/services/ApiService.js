/**
 * Handles API calls.
 */
export default class APIService {
    static APIRoot = "ktruong.net:3002";

    static APIEndPoints = {
        LIST: this.APIRoot + `/lists`,
        TASK: this.APIRoot + `/tasks`,
    };

    static METHODS = {
        GET: "GET",
        PUT: "PUT",
        POST: "POST",
        DELETE: "DELETE",
    };

    /**
     * Gets all lists in the database.
     */
    static async getLists() {
        try {
            const response = await fetch(this.APIEndPoints.LIST, {
                method: this.METHODS.GET,
                mode: "cors",
                headers: {
                    "Content-Type": "application.json",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            if (response.ok) return await response.json();
            console.log(response.status);
        } catch (error) {
            console.log(error.messages);
        }
    }

    /**
     * Creates a new list in the database.
     */
    static async createList() {
        try {
            const response = await fetch(this.APIEndPoints.LIST, {
                method: this.METHODS.POST,
                mode: "cors",
                headers: {
                    "Content-Type": "application.json",
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            return response.ok;
        } catch (error) {
            console.log(error.messages);
        }
    }

    /**
     * Updates a list.
     * @param {List} list List object that holds the new updates.
     */
    static async updateList(list) {
        try {
            const response = await fetch(
                this.APIEndPoints.LIST + `/${list.id}`,
                {
                    method: this.METHODS.PUT,
                    mode: "cors",
                    headers: {
                        "Content-Type": "application.json",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: JSON.stringify(list.getProperties()),
                }
            );

            return response.ok;
        } catch (error) {
            console.log(error.messages);
        }
    }

    /**
     * Deletes a list.
     * @param {List} list List object that holds the id needed to delete the list.
     */
    static async deleteList(list) {
        try {
            const response = await fetch(
                this.APIEndPoints.LIST + `/${list.id}`,
                {
                    method: this.METHODS.DELETE,
                    mode: "cors",
                    headers: {
                        "Content-Type": "application.json",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            return response.ok;
        } catch (error) {
            console.log(error.messages);
        }
    }

    /**
     * Gets all tasks based on the list.
     * @param {List} list List object that holds the id needed to fetch tasks.
     */
    static async getTasks(list) {
        try {
            const response = await fetch(
                this.APIEndPoints.TASK + `/${list.id}`,
                {
                    method: this.METHODS.GET,
                    mode: "cors",
                    headers: {
                        "Content-Type": "application.json",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            if (response.ok) return await response.json();

            console.log(response.ok);
        } catch (error) {
            console.log(error.messages);
        }
    }

    /**
     * Creates an empty new task in the specified list.
     * @param {List} list
     */
    static async createTask(list) {
        try {
            const response = await fetch(
                this.APIEndPoints.TASK + `/${list.id}`,
                {
                    method: this.METHODS.POST,
                    mode: "cors",
                    headers: {
                        "Content-Type": "application.json",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            return response.ok;
        } catch (error) {
            console.log(error.messages);
        }
    }

    /**
     * Updates specified task.
     * @param {Task} task The task instance to be updated
     */
    static async updateTask(task) {
        try {
            const response = await fetch(
                this.APIEndPoints.TASK + `/${task.id}`,
                {
                    method: this.METHODS.PUT,
                    mode: "cors",
                    headers: {
                        "Content-Type": "application.json",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: JSON.stringify(task.getProperties()),
                }
            );

            console.log(response.ok);
        } catch (error) {
            console.log(error.messages);
        }
    }

    /**
     * Deletes the specified task.
     * @param {Task} task
     */
    static async deleteTask(task) {
        try {
            const response = await fetch(
                this.APIEndPoints.TASK + `/${task.id}`,
                {
                    method: this.METHODS.DELETE,
                    mode: "cors",
                    headers: {
                        "Content-Type": "application.json",
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            return response.ok;
        } catch (error) {
            console.log(error.messages);
        }
    }
}

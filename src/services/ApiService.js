/**
 * Handles API calls.
 */
export default class APIService {
    static APIRoot = "https://ktruong.net:3002/API/v1";

    static token = null;

    static APIEndPoints = {
        AUTH: this.APIRoot + `/auth`,
        LISTS: this.APIRoot + `/lists`,
        LIST: this.APIRoot + `/list`,
        TASKS: this.APIRoot + `/tasks`,
        TASK: this.APIRoot + `/task`,
    };

    static METHODS = {
        GET: "GET",
        PUT: "PUT",
        POST: "POST",
        DELETE: "DELETE",
    };

    static async authenticate(username, password) {
        try {
            const response = await fetch(this.APIEndPoints.AUTH, {
                method: this.METHODS.POST,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            if (response.ok) {
                const token = await response.json();
                this.token = token;
                return token;
            }
            throw new Error(response.status);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Gets all lists in the database.
     */
    static async getLists() {
        const response = await fetch(this.APIEndPoints.LISTS, {
            method: this.METHODS.POST,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: this.token,
            }),
        });
        if (response.ok) return JSON.parse(await response.json());
        throw new Error(response.status);
    }

    /**
     * Creates a new list in the database.
     */
    static async createList() {
        const response = await fetch(this.APIEndPoints.LIST, {
            method: this.METHODS.POST,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: this.token,
            }),
        });

        if (!response.ok) throw new Error(response.status);
    }

    /**
     * Updates a list.
     * @param {List} list List object that holds the new updates.
     */
    static async updateList(list) {
        const response = await fetch(this.APIEndPoints.LIST + `/${list.id}`, {
            method: this.METHODS.PUT,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: this.token,
                ...list.getProperties(),
            }),
        });

        if (!response.ok) throw new Error(response.status);
    }

    /**
     * Deletes a list.
     * @param {List} list List object that holds the id needed to delete the list.
     */
    static async deleteList(list) {
        const response = await fetch(this.APIEndPoints.LIST + `/${list.id}`, {
            method: this.METHODS.DELETE,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: this.token,
            }),
        });

        if (!response.ok) throw new Error(response.status);
    }

    /**
     * Gets all tasks based on the list.
     * @param {List} list List object that holds the id needed to fetch tasks.
     */
    static async getTasks(list) {
        const response = await fetch(this.APIEndPoints.TASKS + `/${list.id}`, {
            method: this.METHODS.POST,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: this.token,
            }),
        });

        const body = await response.json();

        if (response.ok) return body;
        throw new Error(response.status);
    }

    /**
     * Creates an empty new task in the specified list.
     * @param {List} list
     */
    static async createTask(list) {
        const response = await fetch(this.APIEndPoints.TASK + `/${list.id}`, {
            method: this.METHODS.POST,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: this.token,
            }),
        });

        if (!response.ok) throw new Error(response.status);
    }

    /**
     * Updates specified task.
     * @param {Task} task The task instance to be updated
     */
    static async updateTask(task) {
        const response = await fetch(this.APIEndPoints.TASK + `/${task.id}`, {
            method: this.METHODS.PUT,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: this.token,
                ...task.getProperties(),
            }),
        });

        if (!response.ok) throw new Error(response.status);
    }

    /**
     * Deletes the specified task.
     * @param {Task} task
     */
    static async deleteTask(task) {
        const response = await fetch(this.APIEndPoints.TASK + `/${task.id}`, {
            method: this.METHODS.DELETE,
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: this.token,
            }),
        });

        if (!response.ok) throw new Error(response.status);
    }
}

import { BehaviorSubject } from "rxjs";
import List from "./List";
import APIService from "../services/ApiService";

/**
 * Singleton instance component for the Home View.
 */
class Lists {
    static instance = new Lists();

    constructor() {
        this.lists = new BehaviorSubject([]);
    }

    getListByID(listID) {
        const result = this.lists
            .getValue()
            .filter((list) => list.id == listID);
        if (result) return result[0];
    }

    async getLists() {
        this.lists.next([]);
        const listsData = await APIService.getLists();
        if (listsData) {
            this.lists.next(listsData.map((list) => new List(list)));
        }
    }

    async createList() {
        await APIService.createList();
        this.getLists();
    }

    async deleteList(list) {
        await APIService.deleteList(list);
        this.getLists();
    }
}

export default Lists.instance;

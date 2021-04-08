import { BehaviorSubject } from "rxjs";
import List from "./List";

/**
 * Singleton instance component for the Home View.
 */
class Lists {
    static instance = new Lists();

    constructor() {
        this.lists = new BehaviorSubject([
            new List({ id: 1, name: "Test List" }),
        ]);
    }

    getListByID(listID) {
        for (let list of this.lists.getValue()) {
            if (list.id == listID) return list;
        }
    }
}

export default Lists.instance;

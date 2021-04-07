/**
 * Singleton instance component for the Home View.
 */
class Home {
    static instance = new Home();

    constructor() {
        this.lists = [];
    }
}

export default Home.instance;

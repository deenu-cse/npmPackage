const { loadData, saveData } = require('../lib/fileManager');

class Database {
    constructor() {
        this.data = loadData();
    }

    //create

    create(record) {
        this.data.push(record);
        saveData(this.data);
        return record;
    }

    // READ

    read() {
        this.data = loadData();
        return this.data;
    }

    //Update

    update(id, newRecord) {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) return null;
        this.data[index] = { ...this.data[index], ...newRecord };
        saveData(this.data);
        return this.data[index];
    }

    //Delete
    delete(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index === -1) return null;
        const deletedRecord = this.data.splice(index, 1);
        saveData(this.data);
        return deletedRecord;
    }
}

module.exports = Database;
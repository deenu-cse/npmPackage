#!/usr/bin/env node

const yargs = require('yargs');
const Database = require('../lib/db');
const db = new Database();

// Function to create a record from dynamic arguments
const createRecordFromArgs = (argv) => {
    const record = { id: Date.now().toString() };
    // Iterate over all the properties of argv and dynamically add them to the record
    Object.keys(argv).forEach((key) => {
        if (key !== '_' && key !== '$0') { 
            record[key] = argv[key];
        }
    });
    return record;
};

yargs.command({
    command: 'create',
    builder: (yargs) => {
        return yargs;
    },
    handler(argv) {
        const record = createRecordFromArgs(argv);
        db.create(record);
        console.log('Record created:', record);
    }
})
    .command({
        command: 'read',
        handler() {
            const records = db.read();
            console.log(records);
        }
    })
    .command({
        command: 'update',
        builder: (yargs) => {
            return yargs.option('id', { type: 'string', demandOption: true });
        },
        handler(argv) {
            const updatedRecord = db.update(argv.id, createRecordFromArgs(argv));
            if (updatedRecord) {
                console.log('Record updated:', updatedRecord);
            } else {
                console.log('Record not found');
            }
        }
    })
    .command({
        command: 'delete',
        builder: {
            id: { type: 'string', demandOption: true },
        },
        handler(argv) {
            const deletedRecord = db.delete(argv.id);
            if (deletedRecord) {
                console.log('Record deleted:', deletedRecord);
            } else {
                console.log('Record not found');
            }
        }
    })

    .help().argv;

#!/usr/bin/env node

const yargs = require('yargs');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

let dynamicSchema;

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

const connectToMongoDB = async (DbUri) => {
    try {
        await mongoose.connect(DbUri);
        console.log('🚀Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

const loadDataFromJSON = async () => {
    try {
        // Adjust the path to point to the correct location
        const filePath = path.join(__dirname, '..', 'data', 'data.json');
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        console.log('📝Data loaded from JSON:', jsonData);
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading data.json:', error);
        return [];
    }
}

const createDynamicSchema = async (data) => {
    try {
        if (data.length === 0) return;
        const firstRecord = data[0];
        const schemaFields = {};

        Object.keys(firstRecord).forEach(key => {
            schemaFields[key] = { type: mongoose.Schema.Types.Mixed, required: true };
        });

        dynamicSchema = new mongoose.Schema(schemaFields);
    } catch (error) {
        console.error('Error creating dynamic schema:', error);
    }
}

const storeDataInMongoDB = async (data) => {
    if (!dynamicSchema) {
        console.error('Schema is not defined');
        return;
    }

    const Model = mongoose.model('CustomData', dynamicSchema);

    try {
        for (const record of data) {
            await Model.findOneAndUpdate({ id: record.id }, record, { upsert: true });
        }
        console.log(`🎉 ${data.length} records processed successfully.`);
    } catch (error) {
        console.error('Error inserting/updating data into MongoDB:', error);
    }
};

yargs.command({
    command: 'create',
    builder: (yargs) => {
        return yargs;
    },
    handler(argv) {
        console.log('migrateMongo command executed');
        const record = createRecordFromArgs(argv);
        // Assuming db.create() is defined elsewhere, if not it should be implemented
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
    .command({
        command: 'migrateMongo',
        builder: (yargs) => {
            return yargs.option('DbUri', { type: 'string', demandOption: true, describe: 'MongoDB URI' })
        },
        handler: async (argv) => {
            const DbUri = argv.DbUri;

            // Connect to MongoDB
            await connectToMongoDB(DbUri);

            // Load and process data
            const data = await loadDataFromJSON();  // Await the data load

            // Check if data exists
            if (data.length === 0) {
                console.log('No data found in data.json');
                return;
            }

            // Create dynamic schema based on the data
            await createDynamicSchema(data);  // Await the schema creation

            // Store the data in MongoDB
            await storeDataInMongoDB(data);  // Await the data insertion
        }
    })
    .help().argv;

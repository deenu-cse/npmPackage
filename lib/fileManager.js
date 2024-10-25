const fs = require('fs');
const path = require('path');

// Define the relative path to the 'data' directory and 'data.json' file
const dataDir = path.join(process.cwd(), 'data'); // Use process.cwd() for the current working directory
const filePath = path.join(dataDir, 'data.json');

// Ensure that the 'data' folder and 'data.json' file exist
const ensureDataFileExists = () => {
    // Check if the directory exists, if not, create it
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir); // Create the directory
    }

    // Check if the data.json file exists, if not, create an empty array as JSON
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]', 'utf8'); // Initialize with an empty array
    }
};

const loadData = () => {
    ensureDataFileExists();

    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataString = dataBuffer.toString();

        // Check if file content is empty
        if (dataString.trim() === '') {
            return [];
        }

        return JSON.parse(dataString);
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return []; // Return an empty array if JSON is invalid
    }
}

const saveData = (data) => {
    try {
        const jsonString = JSON.stringify(data, null, 2); // Convert data to JSON string
        fs.writeFileSync(filePath, jsonString); // Write the JSON to file
    } catch (error) {
        console.error('Error saving data:', error);
    }
};

module.exports = { loadData, saveData };

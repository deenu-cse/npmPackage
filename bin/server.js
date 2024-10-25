#!/usr/bin/env node

const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const port = 1269;

// Middleware to parse JSON and handle CORS
app.use(express.json());
app.use(cors());

// Endpoint to handle form submission
app.post('/run-command', (req, res) => {
    const { command } = req.body;
    console.log(req.body)
    // Execute the command in the terminal
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error}`);
            return res.status(500).json({ error: 'Error creating record.' });
        }
        console.log(`Command output: ${stdout}`);
        res.json({ message: 'Record created successfully!', output: stdout });
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

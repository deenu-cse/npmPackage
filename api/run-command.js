// api/run-command.js
const { exec } = require('child_process');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { command } = req.body;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error}`);
                return res.status(500).json({ error: 'Error executing command.' });
            }
            res.status(200).json({ message: 'Command executed successfully!', output: stdout });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

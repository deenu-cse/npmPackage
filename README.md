🎨 Custom DB
A simple database management tool that lets you perform CRUD operations via the CLI and interact with an API to submit commands. This tool allows developers to quickly manage a local JSON-based database and also provides a server to handle form submissions.

✨ Features

📄 Custom CLI for creating, reading, updating, and deleting records.
🌐 Express API server to run commands via HTTP requests.
📂 JSON-based local storage.
🛠️ Easy integration into any project.


🚀 Installation
To install the custom-db package run the following command:

*npm install custom-db-cli

Installation To install the custom-db package globally run the following command:

*npm install -g custom-db-cli

This will make the custom-db CLI and server commands available globally.


🔧 CLI Usage
The custom-db command provides several operations to interact with your local JSON database.

➕ Create a Record
custom-db create --name="John Doe" --age=25 --email="john@example.com" --password="password123"


📖 Read All Records
custom-db read

This command will display all the records stored in your JSON database.

✏️ Update a Record

custom-db update --id="12345" --name="Jane Doe" --age=26

Replace the id with the actual record ID you want to update.

❌ Delete a Record

custom-db delete --id="12345"

Replace the id with the actual record ID you want to delete.

🌍 Server Usage
custom-db also comes with a built-in server to handle form submissions via HTTP requests.

▶️ Start the Server
To start the server, use the following command:

*npx custom-db-server

This will run a server on custom-db-cli.vercel.app. The server provides an API endpoint that you can use to run commands from a form submission or a frontend application.

Example: 🛠️ Running Commands via API
Once the server is running, you can send POST requests to https://custom-db-cli.vercel.app/api/run-command to run commands via the API.

Here’s an example of how to submit a command using a POST request:

POST /run-command
Content-Type: application/json

{
  "command": "custom-db create --name=\"Alice\" --age=24 --email=\"alice@example.com\" --password=\"secret\""
}
The server will execute the command and return a response.

-🎨 Example: Frontend Form Integration
If you want to integrate this with a frontend form (e.g., React), you can use the fetch API to send the command:

```javascript
const handleSubmit = (e) => {
  e.preventDefault();

  const command = `custom-db create --name="${formData.name}" --age="${formData.age}" --email="${formData.email}" --password="${formData.password}"`;

  fetch('https://custom-db-cli.vercel.app/api/run-command', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ command }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Form Data Submitted:', data);
      alert('Record created successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
This approach allows users to submit forms, and behind the scenes, your package will execute the CLI commands.


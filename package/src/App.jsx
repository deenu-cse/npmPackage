import './App.css';
import { useState } from 'react';

function App() {
  // Define state to store form inputs
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    gender: ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const command = `custom-db create --name="${formData.name}" --age="${formData.age}" --email="${formData.email}" --password="${formData.password}" --gender="${formData.gender}"`;
    fetch('https://custom-db-cli.vercel.app/api/run-command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ command }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Form Data Submitted:', data);
        alert('Registration Successful!');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  return (
    <>
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="1"
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default App;

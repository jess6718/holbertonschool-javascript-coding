const express = require('express');

const app = express(); // Create an Express app
const PORT = 1245;

// Define a route path of the server
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app
module.exports = app;

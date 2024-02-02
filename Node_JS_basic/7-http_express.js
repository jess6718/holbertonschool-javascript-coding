const express = require('express');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
// Create Express application
const app = express();
const port = 1245;

// Route for '/'
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Function to read and process the file
async function processFile(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    const lines = data.split('\n');
    const students = lines.filter((line) => line.trim().length > 0 && line.includes(',')); // Exclude empty lines and lines without comma

    const count = students.length;
    const csStudents = students.filter((student) => student.endsWith('CS'));
    const sweStudents = students.filter((student) => student.endsWith('SWE'));

    return `This is the list of our students\nNumber of students: ${count}\n`
          + `Number of students in CS: ${csStudents.length}. List: ${csStudents.map((s) => s.split(',')[0]).join(', ')}\n`
          + `Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.map((s) => s.split(',')[0]).join(', ')}`;
  } catch (error) {
    return 'This is the list of our students\nError: Cannot load the database';
  }
}

// Route for '/students'
app.get('/students', async (req, res) => {
  const filePath = process.argv[2]; // Getting the file path from command line argument
  const result = await processFile(filePath);
  res.send(result);
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// Export the app
module.exports = app;

// Handle unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', error);
  server.close(() => process.exit(1));
});

const fs = require('fs');

function countStudents(path) {
  let content;
  try {
    // Read the file
    content = fs.readFileSync(path, { encoding: 'utf8' });
  } catch (error) {
    throw new Error('Cannot load the database');
  }

  // Split the content
  const lines = content.split('\n');
  let count = 0;
  const fields = {};

  for (const line of lines) {
    // Ignore headers or empty lines
    if (line !== '' && !line.startsWith('firstname')) {
      count += 1;
      const studentInfo = line.split(',');
      const field = studentInfo[3];
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(studentInfo[0]);
    }
  }
  console.log(`Number of students: ${count}`);
  for (const [field, students] of Object.entries(fields)) {
    console.log(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
  }
}
module.exports = countStudents;
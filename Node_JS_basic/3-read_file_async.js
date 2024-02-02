const { readFile } = require('fs').promises;

function countStudents(path) {
  return readFile(path, 'utf8')
    .then((content) => {
      // Split the content
      const lines = content.split('\n');
      let count = 0;
      const fields = {};

      for (const line of lines) {
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
    })

    .catch((error) => {
      console.error('Cannot load the database', error);
    });
}
module.exports = countStudents;

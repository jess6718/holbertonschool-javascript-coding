const http = require('http');
const { readFile } = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await readFile(path, 'utf-8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    const studentData = lines.slice(1).map((line) => line.split(','));

    const cs = [];
    const swe = [];
    for (let i = 0; i < studentData.length; i += 1) {
      if (studentData[i][3] === 'CS') {
        cs.push(studentData[i][0]);
      } else if (studentData[i][3] === 'SWE') {
        swe.push(studentData[i][0]);
      }
    }
    return (`Number of students: ${studentData.length}\nNumber of students in CS: ${cs.length}. List: ${cs.join(', ')}\nNumber of students in SWE: ${swe.length}. List: ${swe.join(', ')}`);
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

const hostname = 'localhost';
const port = 1245;

const app = http.createServer(async (req, res) => {
  const path = process.argv[2];
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const title = 'This is the list of our students\n';
    try {
      const result = await countStudents(path);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(title + result);
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end(title + error.message);
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;

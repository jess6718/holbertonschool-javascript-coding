const readDatabase = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const studentData = await readDatabase(process.argv[2]);
      res.status(200).send(`This is the list of our students\nNumber of students in CS: ${studentData.CS.length}. List: ${studentData.CS.join(', ')}\nNumber of students in SWE: ${studentData.SWE.length}. List: ${studentData.SWE.join(', ')}`);
      res.end();
    } catch (error) {
      res.status(500).send(error.message);
      res.end();
    }
  }

  static async getAllStudentsByMajor(req, res) {
    try {
      const { major } = req.params; // same as const major = req.params.major
      if (major !== 'CS' && major !== 'SWE') {
        res.status(500).send('Major parameter must be CS or SWE');
        res.end();
      }
      const studentData = await readDatabase(process.argv[2]);
      res.status(200).send(
        major === 'CS' ? `List: ${studentData.CS.join(', ')}` : `List: ${studentData.SWE.join(', ')}`,
      );
    } catch (error) {
      res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;

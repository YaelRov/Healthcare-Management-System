const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function getMedicalFile(patientId) {
  try {
    const [results, fields] = await pool.query('SELECT * FROM medicalfiles WHERE patientId = ?', [patientId]);
    console.log(results);
    console.log(fields);
    return results;
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

async function getAllMedicalFiles() {
    //להוסיף paging !!!!!!!
    try {
      const [results, fields] = await pool.query('SELECT * FROM medicalfiles');
      console.log(results);
      console.log(fields);
      return results;
    }
    catch (err) {
      console.log(err);
      throw err;
    }
  }

async function addDetail(patientId, detail) {
  try {
    const [results, fields] = await pool.query(
      'INSERT INTO medicalfiles WHERE patientId = ? (detail) VALUES (?)',
      [patientId, detail]
    );
    console.log(results);
    console.log(fields);
    return results;
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

async function deleteDetail(patientId, detail) {
  try {
    const [results, fields] = await pool.query('DELETE FROM medicalfiles WHERE patientId = ? && detail = ?', [patientId, detail]);
    console.log(results);
    console.log(fields);
    return results;
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = {
    getMedicalFile,
    getAllMedicalFiles,
    addDetail,
    deleteDetail
};

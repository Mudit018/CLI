import mysql from 'mysql';

let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: <your_password>,
  database: 'dbms',
  multipleStatements: true
});

db.connect((err) => {
  if (err) {
    console.log("error");
    throw err;
  }
  console.log('Connected!');
})

export default db;
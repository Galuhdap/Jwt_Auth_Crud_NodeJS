import mysql2 from 'mysql2/promise'

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "mysql2",
});


export default db; 
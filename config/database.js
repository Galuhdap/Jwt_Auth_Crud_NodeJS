import mysql2 from 'mysql2/promise'

const getDB = () => mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "mysql2",
});


export default getDB; 
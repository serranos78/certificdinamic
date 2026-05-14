const mysql = require('mysql2');

/*const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Gcra1978*',
  database: 'anime'
});*/


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT // ✅ IMPORTANTE
});


db.connect(err => {
  if (err) {
    console.log("Error conexión:", err);
  } else {
    console.log("MySQL conectado ✅");
  }
});

module.exports = db;

/*mysql://root:
Psw: mFSRAIqfyuZcVdJLmmqCMVECjxknbvvg
URL: shortline.proxy.rlwy.net
Puerto:10564*/

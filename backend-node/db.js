const mysql = require('mysql2');

/*const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Gcra1978*',
  database: 'anime'
});*/


const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
 // ✅ IMPORTANTE
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

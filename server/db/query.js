const db = require('./index');

const query = (sql, data) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, conn) => {
      if (err) return reject(err);
      conn.query(sql, data, (err, results) => {
        // 释放连接
        conn.release();
        if (err) return reject(err);
        resolve(results);
      });
    });
  });
}

module.exports = query;
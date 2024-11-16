
const sql = require("mysql");
const {config} = require("./config");
const pool = sql.createPool(config);


const connectDB = async () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log({ error: err.message });
    }
    console.log("Connected to MySQL database");
    connection.release();
  });
};

const executeQuery = (query) => {
  return new Promise((resolve,reject)=>{
    pool.query(query,(err,results)=>{
      if(err) reject(err);
      else resolve(results);
    })
  });
}
const executeValueQuery = (query,values) => {
  return new Promise((resolve,reject)=>{
    pool.query(query,values,(err,results)=>{
      if(err) reject(err);
      else resolve(results);
    })
  });
}
module.exports = {
  executeQuery,
  executeValueQuery,
  connectDB
};

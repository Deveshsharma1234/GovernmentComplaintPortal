 const mysql = require("mysql2/promise")

 const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: '12345',
        port: 3306,
        database: 'Municipal_Complaint',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
    }
 )

 const connectDB = async () => {
    try {
      const connection = await pool.getConnection();
      console.log('✅ Database connected successfully!');
      connection.release(); // Always release to pool
    } catch (err) {
      console.error('❌ Database connection failed:', err.message);
      throw err;
    }
  };

 module.exports = {pool,connectDB};
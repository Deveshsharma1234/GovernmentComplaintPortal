 const mysql = require("mysql2")
//Development config
 const pool = mysql.createPool(
    {
        host: 'localhost',
        user: 'root',
        password: 'StrongPassw0rd!',
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


//   const pool = mysql.createPool(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: '12345',
//         port: 3306,
//         database: 'Municipal_Complaint',
//         waitForConnections: true,
//         connectionLimit: 10,
//         maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//         idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//         queueLimit: 0,
//         enableKeepAlive: true,
//         keepAliveInitialDelay: 0,
//     }
//  )
 const connectDB = () => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('❌ Database connection failed:', err.message);
            throw err;
        } else {
            console.log('✅ Database connected successfully!');
            connection.release();
        }
    });
};


 module.exports = {pool,connectDB};

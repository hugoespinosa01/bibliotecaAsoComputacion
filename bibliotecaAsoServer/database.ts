import mysql from 'promise-mysql';
import keys from './keys';

const pool = mysql.createPool(keys.database);
pool.getConnection().then((con) => {
    pool.releaseConnection(con);
    console.log('DB is connected');
});

export default pool;
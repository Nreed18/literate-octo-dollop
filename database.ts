// import * as mysql from "mysql2";
import * as mysql from "mysql2/promise";

class Database {
  async connect() {
    // create the connection to database
    // TODO: Failing here...  // webpack minimize?
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      charset: "utf8mb4"
    });
    console.log("connected!");
    // const [rows, fields] = await connection.query('show databases');
    // console.log(rows);
    return connection;
  }

  async closeConnection(connection) {
    console.log("closing connection");
    connection.close();
  }

  async query(query) {
    const connection = await this.connect();
    console.log("connection confirmed!");

    // Send sql query
    const [rows, fields] = await connection.query(query);
    // console.log(rows);

    // Close connection
    this.closeConnection(connection);
    //  Another option is to add 'context.callbackWaitsForEmptyEventLoop = false;' to the lambda export
    //      and leave the db connection open

    return rows;

    // // query database
    // const [rows, fields] = await connection.execute(
    //   'SELECT * FROM test_table');

    // // query database
    // const [rows, fields] = await connection.query(
    //   'SELECT * FROM alexaUsers')
    //   .then((ret) => {return [ret];});
    // console.log('r', rows);

    // const [ret] = await connection.query(
    //   'SELECT * FROM alexaUsers')
    //   // .then((ret) => {return [ret];});
    // console.log('r', ret);

    // // simple query
    // connection.query(
    //   'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
    //   function(err, results, fields) {
    //     console.log(results); // results contains rows returned by server
    //     console.log(fields); // fields contains extra meta data about results, if available
    //   }
    // );

    // return ret;
  }
}
export const db = new Database();
// export { Database };

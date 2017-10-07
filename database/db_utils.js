const pg_options = {};
const pgp = require('pg-promise')(pg_options);
const monitor = require('pg-monitor');

//add db query logging to the console
monitor.attach(pg_options);

const connection_options = {
  host: 'localhost',
  port: 5432,
  database: process.env.NODE_ENV === 'test' ? 'TodoListWithSQL_test' : 'TodoListWithSQL' 
}


const db = pgp(connection_options);

const initializeTestDB = () => {
  return db.none(`
    INSERT INTO listOfTasks (description, isComplete)
    VALUES ('buy groceries', 'false')
    `)
};

//list tasks 
const getAllTasks = () => {
  return db.any(`
    SELECT 
      * 
    FROM 
      listOfTasks
    WHERE
      isComplete = false;
    `);
};

//add a task 
const createTask = (task) => {
  return db.one(`
    INSERT INTO 
      listOfTasks (description, isComplete)
    VALUES 
      ($1, $2)
    RETURNING 
      id
  `,
  [task, false] )
};

//update a task 
const updateTask = (id) => {
  return db.one(`
    UPDATE 
      listOfTasks
    SET 
      isComplete = true
    WHERE 
      id = $1
    RETURNING
      *
    `,
  [id] )
};

//delete a task 
const deleteTask = (id) => {
  return db.one(`
    DELETE FROM
      listOfTasks
    WHERE
      id = $1
    RETURNING 
      *
    `, 
  [id] )
};

const closeConnection = () => {
  pgp.end();
};

module.exports = {
  initializeTestDB,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  closeConnection
}




DROP TABLE IF EXISTS listOfTasks;

CREATE TABLE listOfTasks (
  id SERIAL PRIMARY KEY,
  description varchar(255) UNIQUE,
  isComplete boolean NOT NULL
);



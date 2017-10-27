#!/usr/bin/env node
const command = process.argv[2];
const taskName = process.argv.slice(3).join(' ');
const id = process.argv[3];

const { list, addTask, removeTask, completeTask } = require('./commands');
const { closeConnection } = require('./database/db_utils')

switch (command) {
  case 'add':
    addTask(taskName);
    break;
  case 'list':
    list();
    break;
  case 'complete':
    completeTask(id);
    break;
  case 'delete':
    removeTask(id);
    break;
  default:
    console.log('Command not recognized');
}

closeConnection()

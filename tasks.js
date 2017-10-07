#!/usr/bin/env node
const pgp = require('pg-promise');
const command = process.argv[2];
const taskName = process.argv[3];
const id = process.argv[3];

const { list, addTask, removeTask, completeTask } = require('./commands');


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

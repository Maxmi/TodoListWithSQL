const  { getAllTasks, createTask, deleteTask, updateTask,  closeConnection } = require('./database/db_utils.js');

const render = (filtered) => {
  const header = '\nID Description \n-- ----------- \n';
  const tasks = filtered.map((task) => `${task.id} ${task.description}\n`).join(' ');
  return `${header} ${tasks}`;
};

const list = () => {
  return getAllTasks().then(allTasks => {
    const filtered = allTasks.filter(task => !task.isComplete);
    console.log(render(filtered));
    const message = `You have ${filtered.length} task(s).`;
    console.log(message);
    return message;
  }).catch(err => {
    throw new Error ('An error has occured while reading from db');
  })
};


const addTask = (taskName) => {  
  return createTask(taskName).then(res => {
    const message = `Created task ${res.id}`; 
    console.log(message);
    return message;
  }).catch(err => {
    console.log('Duplicate task, not added.');
  });
};


const removeTask = (id) => {
  return deleteTask(id).then(res => {
    const message = `Deleted task ${res.id}: ${res.description}`;
    console.log(message);
    return message;
  }).catch(err => {
    console.log(`Can not delete this task, id ${id} not found`);
  });
};


const completeTask = (id) => {
  return updateTask(id).then(res => {
    const message = `Completed task ${res.id}: ${res.description}`;
    console.log(message);
    return message;
  }).catch(err => {
    console.log(`Task id ${id} not found`);
  })
}

module.exports = {
  list,
  addTask,
  removeTask, 
  completeTask
}
const { getAllTasks, createTask, deleteTask, updateTask } = require('./database/db_utils.js');

/**
 * [render description]
 * @param  {array} filtered [description]
 * @return {string}          [description]
 */
const render = (filtered) => {
  const header = '\nID Description \n-- ----------- \n';
  const tasks = filtered.map(task => `${task.id} ${task.description}\n`).join(' ');
  return `${header} ${tasks}`;
};

const printOutput = (printArray) => {
  const [message, taskArray] = printArray
  if (taskArray) console.log(render(taskArray))
  console.log(message)
}

const getListPrintoutStrings = () =>
  getAllTasks()
    .then((allTasks) => {
      const filtered = allTasks.filter(task => !task.isComplete);
      const message = `You have ${filtered.length} task(s).`;
      return [message, filtered];
    }).catch((err) => {
      throw new Error(`An error has occured while reading from db: ${err.message}`);
    });

/**
 * [list description]
 * @return {[type]} [description]
 */
const list = () => getListPrintoutStrings().then(printOutput)

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

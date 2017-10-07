const expect = require('chai').expect;
const {
  list,
  addTask,
  removeTask, 
  completeTask
} = require('../commands');

const { createTask } = require('../database/db_utils');

describe.only('commands', function() {
  
  describe('list', function() {
    beforeEach(function(done) {
      createTask('some task');
      done();
    });
    
    it('should return message about active tasks', function(done) {
      list().then(function(message) {
        expect(message.length).to.be.above(0);
        done();
      })
    })
  }); //end of describe for list 
  
  describe('addTask', function() {
  
    it('should return success message if task was added', function(done) {
      addTask('new task').then(function(message) {
        expect(message).to.equal('Created task 2');
        done();
      })
    });
  }); //end of describe for addTask
  
  describe('removeTask', function() {
    it('should return success message if task was deleted', function(done) {
      removeTask(1).then(function(message) {
        expect(message).to.equal('Deleted task 1: some task');
        done();
      })
    });
  }); //end of describe for removeTask
  
  describe('completeTask', function() {
    it('should return success message after task is complete', function(done) {
      completeTask(2).then(function(message) {
        expect(message).to.equal('Completed task 2: new task');
        done();
      })
    });
  }); //end of describe for completeTask
  
}); //end of most outer describe
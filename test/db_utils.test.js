const expect = require('chai').expect;
const pg = require('pg-promise')();

const {
  initializeTestDB,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../database/db_utils');

describe('database queries', function() {
  
  describe('getAllTasks', function() {
    context('when table is empty', function() {
      it('should get no results', function(done) {
        getAllTasks().then(function(tasks){
          expect(tasks.length).to.equal(0);
          done();
        })
      })
    });
    context('when table is not empty', function() {
      beforeEach(function(done) {
        initializeTestDB();
        done();
      });
      it('should return all active tasks in listOfTasks table', function(done) {
        getAllTasks().then(function(data) {
          expect(data.length).to.equal(1);
          done();
        })
      })
    }); //end of context for getAllTasks
  }); //end of describe for getAllTasks

  describe('createTask', function() {
    context('when given new and unique task', function() {
      it('should add it to the table', function(done) {
        createTask('test task').then(function(data) {
          expect(data.id).to.equal(2);
          done();
        })
      })
    })
  }); //end of describe for createTask


  describe('updateTask', function() {
    context('when given id of existing and active task', function() {
      it('should change complete status of a task to true', function(done) {
        updateTask(2).then(function(data) {
          expect(data.iscomplete).to.be.true;
          done();
        })
      })
    })
  });//end of describe for updateTask

  describe('deleteTask', function() {
    context('when given id of existing task', function() {
      it('should delete it from the list', function(done) {
        deleteTask(2).then(function(data) {
          expect(data.id).to.equal(2);
          done();
        })
      })
    })
  }); //end of describe for deleteTask

});//end of most outer describe



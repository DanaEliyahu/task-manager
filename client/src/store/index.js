import { decorate, observable, action } from "mobx";
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import api from "../api";

class TaskStore {
  constructor () {
    if (!Cookies.get("Session")) {
      Cookies.set("Session", uuidv4());
    }
  }

  tasks = [];
  async initTasksBySession() {
    try {
      const response = await api.get(`/tasks/${Cookies.get("Session")}`);
      this.tasks = response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async initAllTasks () {
    try {
      const response = await api.get('/tasks');
      this.tasks = response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async addTask(task) {
    try {
      const response = await api.post("/tasks", task);
      this.tasks.push(response.data);
    } catch (error) {
      console.log(error);
    }
  }
}

decorate(TaskStore, {
  tasks: observable,
  addTask: action,
  initAllTasks: action,
  initTasksBySession: action
});

const taskStoreInstance = new TaskStore();
taskStoreInstance.initTasksBySession();
export default taskStoreInstance;

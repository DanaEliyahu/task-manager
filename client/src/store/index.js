import { decorate, observable, action } from "mobx";
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import api from "../api";

class TaskStore {
  tasks = [];

  constructor () {
    if (!Cookies.get("Session")) {
      Cookies.set("Session", uuidv4());
    }
  }

  async initTasks (url) {
    try {
      const response = await api.get(url);
      this.tasks = response.data;
    } catch (error) {   
      throw error;
    }
  }

  async initTasksBySession() {
    await this.initTasks('/tasks/bySession');
  }

  async initAllTasks () {
    await this.initTasks('/tasks');
  }

  async addTask(task) {
    try {
      const response = await api.post("/tasks", task);
      this.tasks.push(response.data);
    } catch (error) {
      throw error;
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

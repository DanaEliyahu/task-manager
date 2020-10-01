import { decorate, observable, action } from "mobx";
import api from "../api";

class TaskStore {
  tasks = [];
  async initTasks() {
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
});

const taskStoreInstance = new TaskStore();
taskStoreInstance.initTasks();
export default taskStoreInstance;

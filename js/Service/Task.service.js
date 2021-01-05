import { createFetch } from '../createFetch.js'
import { Task } from '../Model/Task.model.js'
import { urlUsers, urlTasks } from '../config.js'

export default class TaskService {
  constructor () {
    this.tasks = []
  }

  add (task, userId, sucess, error) {
    createFetch('POST', `${urlUsers}/${userId}/tasks`, JSON.stringify(task))
      .then(() => this.getTasks(userId))
      .then(() => sucess())
      .catch(err => error(err.message))
  }

  getTasks (userId, sucess, error) {
    const fn = (arrTasks) => {
      this.tasks = arrTasks.map(task => {
        const { title, completed, createdAt, updatedAt, id } = task
        return new Task(title, completed, createdAt, updatedAt, id)
      })

      if (typeof sucess === 'function') sucess(this.tasks)
      return this.tasks
    }
    return createFetch('GET', `${urlUsers}/${userId}/tasks`)
      .then(response => fn(response))
      .catch(erro => {
        if (typeof error === 'function') {
          return error(erro.message)
        }
        throw Error(erro.message)
      })
  }

  delete (id, sucess, error, userId) {
    createFetch('DELETE', `${urlTasks}/${id}`)
      .then(() => this.getTasks(userId))
      .then(() => sucess())
      .catch(err => error(err.message))
  }

  edit (id, sucess, error, userId, newTitle) {
    const task = { title: newTitle, updatedAt: Date.now() }
    createFetch('PATCH', `${urlTasks}/${id}`, JSON.stringify(task))
      .then(() => this.getTasks(userId))
      .then(() => sucess())
      .catch(err => error(err.message))
  }

  check (id, sucess, error, userId) {
    const task = this.tasks.find(task => task.id == id)
    const checkTask = !task.completed
    const check = { completed: checkTask, updatedAt: Date.now() }
    createFetch('PATCH', `${urlTasks}/${id}`, JSON.stringify(check))
      .then(() => this.getTasks(userId))
      .then(() => sucess())
      .catch(err => error(err.message))
  }
}

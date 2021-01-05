import { Task } from '../Model/Task.model.js'
import { userId } from '../config.js'

export default class TasksController {
  constructor (service, view) {
    this.service = service
    this.view = view
  }

  add (title) {
    this.service.add(
      new Task(title),
      userId,
      () => this.view.render(this.service.tasks),
      (erro) => alert(erro)
    )
  }

  remove (id) {
    this.service.delete(
      id,
      () => this.view.render(this.service.tasks),
      (erro) => alert(erro),
      userId
    )
  }

  edit (id, newTitle) {
    this.service.edit(
      id,
      () => this.view.render(this.service.tasks),
      (erro) => alert(erro),
      userId,
      newTitle
    )
  }

  check (id) {
    this.service.check(
      id,
      () => this.view.render(this.service.tasks),
      (erro) => alert(erro),
      userId
    )
  }

  getTasks () {
    this.service.getTasks(
      userId,
      () => this.view.render(this.service.tasks),
      (erro) => alert(erro)
    )
  }
}

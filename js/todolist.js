import TaskService from './Service/Task.service.js'
import TaskController from './Controller/Tasks.controller.js'
import TasksView from './View/Tasks.view.js'

const itemInput = document.getElementById('item-input')
const todoAddForm = document.getElementById('todo-add')
const ul = document.getElementById('todo-list')

const taskService = new TaskService()
const tasksView = new TasksView(ul)
const taskController = new TaskController(taskService, tasksView)

taskController.getTasks()

todoAddForm.addEventListener('submit', function (e) {
  e.preventDefault()
  taskController.add(itemInput.value)

  itemInput.value = ''
  itemInput.focus()
})

function clickedUl (e) {
  const dataAction = e.target.getAttribute('data-action')
  console.log(e.target)
  if (!dataAction) return

  let currentLi = e.target
  while (currentLi.nodeName !== 'LI') {
    currentLi = currentLi.parentElement
  }

  const actions = {
    editButton: function () {
      const editContainer = currentLi.querySelector('.editContainer');

      [...ul.querySelectorAll('.editContainer')].forEach(container => {
        container.removeAttribute('style')
      })

      editContainer.style.display = 'flex'
    },
    deleteButton: function () {
      taskController.remove(currentLi.getAttribute('data-id'))
    },
    containerEditButton: function () {
      const val = currentLi.querySelector('.editInput').value
      taskController.edit(currentLi.getAttribute('data-id'), val)
    },
    containerCancelButton: function () {
      currentLi.querySelector('.editContainer').removeAttribute('style')
    },
    checkButton: function () {
      taskController.check(currentLi.getAttribute('data-id'))
    }
  }

  if (actions[dataAction]) {
    actions[dataAction]()
  }
}

ul.addEventListener('click', clickedUl)

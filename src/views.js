import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'

const renderTodos = () => {
    const todoListEl = document.querySelector('#todos')
    const { searchText, hideCompleted } = getFilters()
    const filterTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const hideCompletedMatch = !hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })
    
    const incompleteTodos = filterTodos.filter((todo) => !todo.completed)

    todoListEl.innerHTML = ''
    todoListEl.appendChild(generateSummaryDOM(incompleteTodos))
  
    if (filterTodos.length > 0) {
        filterTodos.forEach((todo) => {
            todoListEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const emptyMessageEl = document.createElement('p')
        emptyMessageEl.classList.add('empty-message')
        emptyMessageEl.textContent = 'No todos to show'
        todoListEl.appendChild(emptyMessageEl)
    }
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')
    
    // setup the todo checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        renderTodos()
    })
    
    // setup the todo text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    // setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    // setup the remove todo button
    removeButton.textContent = 'Remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', (e) => {
        removeTodo(todo.id) 
        renderTodos()
    })

    return todoEl
}

const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    const plural = incompleteTodos.length === 1 ? '' : 's'

    summary.classList.add('list-title')
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left.`
   
    return summary
}

export { generateTodoDOM, renderTodos, generateSummaryDOM }
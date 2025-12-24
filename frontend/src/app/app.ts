import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AddTodo } from './components/add-todo/add-todo';
import { TodoList } from './components/todo-list/todo-list';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AddTodo, TodoList,FormsModule,HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    title = 'To-Do List';
  subtitle = 'MEAN Stack Application';

  @ViewChild(TodoList) todoList!: TodoList;

  handleTodoAdded(): void {
    console.log('Todo added event received!');
    // Refresh the todo list
    if (this.todoList) {
      this.todoList.loadTodos();
    }
  }
}

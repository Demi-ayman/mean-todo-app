import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo';
import { Todo } from '../../models/todo.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {
  todos: Todo[] = [];
  loading = false;
  error: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.error = '';

    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading todos:', error);
        this.error = 'Failed to load todos. Please try again.';
        this.loading = false;
      }
    });
  }

  onTodoAdded(): void {
    this.loadTodos();
  }

  getFormattedDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

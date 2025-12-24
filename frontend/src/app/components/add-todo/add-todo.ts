import { Component, EventEmitter, Output } from '@angular/core';
import {TodoService} from '../../services/todo';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [ FormsModule,CommonModule],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css',
})
export class AddTodo {
  @Output() todoAdded = new EventEmitter<void>();

  newTodoText = '';
  isSubmitting = false;
  showSuccess = false;
  error: string = '';

  constructor(private todoService: TodoService) { }

  addTodo(): void {
    if (!this.newTodoText.trim()) {
      this.error = 'Please enter a to-do item';
      return;
    }

    this.isSubmitting = true;
    this.error = '';
    this.showSuccess = false;

    this.todoService.addTodo(this.newTodoText.trim()).subscribe({
      next: (todo) => {
        console.log('Todo added successfully:', todo);
        this.newTodoText = '';
        this.isSubmitting = false;
        this.showSuccess = true;
        this.todoAdded.emit();

        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showSuccess = false;
        }, 3000);
      },
      error: (error) => {
        console.error('Error adding todo:', error);
        this.error = 'Failed to add todo. Please try again.';
        this.isSubmitting = false;
        this.showSuccess = false;
      }
    });
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.addTodo();
    }
  }
}

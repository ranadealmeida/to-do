import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { ToDoItem } from '@models/toDoItem';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [FormsModule, CommonModule, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'todo-app';
  items: ToDoItem[] = [];
  newItemText = '';

  constructor(private todoService: TodoService) {}

  async ngOnInit(): Promise<void> {
    await this.fetchTodos();
  }

  async fetchTodos(): Promise<void> {
    this.items = await this.todoService.getTodos();
  }

  async addNewItem(): Promise<void> {
    if (!this.newItemText.trim()) return;

    const newItemData = {
      title: this.newItemText,
      isComplete: false,
    };

    this.todoService.addTodo(newItemData).then((addedItem) => {
      if (addedItem) {
        this.items.push(new ToDoItem(addedItem.id, addedItem.title, addedItem.complete));
        this.newItemText = '';
      }
    });
  }
}

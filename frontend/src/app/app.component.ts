import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { ToDoItem } from '@models/toDoItem';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'todo-app';
  items: ToDoItem[] = [];
  newItemText = '';

  constructor(private todoService: TodoService) { }

  async ngOnInit(): Promise<void> {
    await this.fetchTodos();
  }

  async fetchTodos(): Promise<void> {
    this.items = await this.todoService.getTodos();
  }

  async addNewItem(): Promise<void> {
    console.log('Add button clicked');
    if (!this.newItemText.trim()) return;
  
    const newItemData = {
      title: this.newItemText,
      isComplete: false, 
    };
  
    console.log('New item data to send:', newItemData);
  
    this.todoService.addTodo(newItemData).then((addedItem) => {
      if (addedItem) {
        const newItem = new ToDoItem(addedItem.id, addedItem.title, addedItem.isComplete);
        console.log('Item added:', newItem);
  
        this.items.push(newItem);
        this.newItemText = '';
      }
    });
  }

  async deleteItem(index: number, id: number): Promise<void> {
    const success = await this.todoService.deleteTodo(id);
    if (success) this.items.splice(index, 1);
  }
}

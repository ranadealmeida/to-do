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

  listFilter: String = '0';
  visibleItems: ToDoItem[] = this.items;

  filterChanged(value: any) {
    if (value === '0') {
      this.visibleItems = this.items;
    } else if (value === '1') {
      this.visibleItems = this.items.filter(item => item.complete === false);
    } else if (value === '2') {
      this.visibleItems = this.items.filter(item => item.complete === true);
    }
  }

  constructor(private todoService: TodoService) { }

  async ngOnInit(): Promise<void> {
    await this.fetchTodos();
  }

  async fetchTodos(): Promise<void> {
    this.items = await this.todoService.getTodos();
    this.filterChanged(this.listFilter);
  }

  async addNewItem(): Promise<void> {
    if (!this.newItemText.trim()) return;

    const newItemData = {
      title: this.newItemText,
      isComplete: false,
    };


    this.todoService.addTodo(newItemData).then((addedItem) => {
      if (addedItem) {
        const newItem = new ToDoItem(addedItem.id, addedItem.title, addedItem.complete);
        console.log('Item added:', newItem);

        this.items.push(newItem);
        this.filterChanged(this.listFilter);
        this.newItemText = '';
      }
    });
    
  }

  async deleteItem(index: number, id: number): Promise<void> {
    const success = await this.todoService.deleteTodo(id);
    if (success) this.items.splice(index, 1);
    this.filterChanged(this.listFilter);
  }

  async toggleComplete(item: ToDoItem): Promise<void> {
    const updatedItem = await this.todoService.updateTodo(item);
    if (updatedItem) {
      item.complete = updatedItem.complete; 
      this.filterChanged(this.listFilter);
    }
  }
  
}

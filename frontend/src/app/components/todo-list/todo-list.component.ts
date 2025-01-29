import { Component, Input } from '@angular/core';
import { ToDoItem } from '@models/toDoItem';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true, 
  imports: [CommonModule, FormsModule,TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  @Input() items: ToDoItem[] = [];
  listFilter: string = '0';
  visibleItems: ToDoItem[] = [];

  constructor(private todoService: TodoService) {}

  ngOnChanges() {
    this.filterChanged(this.listFilter);
  }

  filterChanged(value: string) {
    this.listFilter = value;
    if (value === '0') {
      this.visibleItems = this.items;
    } else if (value === '1') {
      this.visibleItems = this.items.filter((item) => !item.complete);
    } else if (value === '2') {
      this.visibleItems = this.items.filter((item) => item.complete);
    }
  }

  async toggleComplete(item: ToDoItem) {
    const updatedItem = await this.todoService.updateTodo(item);
    if (updatedItem) {
      item.complete = updatedItem.complete;
      this.filterChanged(this.listFilter);
    }
  }

  async deleteItem(index: number, id: number) {
    const success = await this.todoService.deleteTodo(id);
    if (success) this.items.splice(index, 1);
    this.filterChanged(this.listFilter);
  }
}

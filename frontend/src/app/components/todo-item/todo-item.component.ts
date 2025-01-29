import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToDoItem } from '@models/toDoItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() item!: ToDoItem;
  @Output() toggle = new EventEmitter<ToDoItem>();
  @Output() delete = new EventEmitter<number>();

  toggleComplete() {
    this.toggle.emit(this.item);
  }

  deleteItem() {
    this.delete.emit(this.item.id);
  }
}

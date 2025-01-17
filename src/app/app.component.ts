import { Component } from '@angular/core';
import { ToDoItem } from '@models/toDoItem';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  items: ToDoItem[] = [];
  title = 'todo-app';

  newItemText = '';

  toggleItem(item : ToDoItem) {
    item.isComplete = !item.isComplete;
    console.log(item);
  }

  addNewItem() {
    this.items.push(new ToDoItem(this.newItemText));
    this.newItemText = '';
  }
}



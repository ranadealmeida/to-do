import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { ToDoItem } from '@models/toDoItem';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly apiUrl = 'http://localhost:8080/api/todos';
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  private handleError(error: AxiosError, context: string): void {
    console.error(`Error occurred while ${context}:`, error.message);
  }

  async getTodos(): Promise<ToDoItem[]> {
    try {
      const response = await this.axiosInstance.get('');
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, 'fetching todos');
      return [];
    }
  }

  async addTodo(todo: Partial<ToDoItem>): Promise<ToDoItem | null> {
    try {
      const response = await this.axiosInstance.post('', todo);
      console.log('Service response:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, 'adding a todo');
      return null;
    }
  }

  async deleteTodo(id: number): Promise<boolean> {
    try {
      await this.axiosInstance.delete(`/${id}`);
      return true;
    } catch (error) {
      this.handleError(error as AxiosError, 'deleting a todo');
      return false;
    }
  }

  async updateTodo(item: ToDoItem): Promise<ToDoItem | null> {
    try {
      const response = await this.axiosInstance.put(`/${item.id}`, {
        title: item.title, 
        complete: !item.complete, 
      });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError, 'updating a todo');
      return null;
    }
  }
  
}

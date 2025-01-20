package com.rana.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository; 

    @GetMapping
    public List<Todo> getTodos() {
        return todoRepository.findAll();
    }

    @PostMapping
    public Todo addTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo); 
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id);
            return ResponseEntity.noContent().build(); 
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }
}

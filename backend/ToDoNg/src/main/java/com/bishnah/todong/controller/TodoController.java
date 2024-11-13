package com.bishnah.todong.controller;

import com.bishnah.todong.model.Todo;
import com.bishnah.todong.payload.TodoPayloadDTO;
import com.bishnah.todong.payload.TodoViewDTo;
import com.bishnah.todong.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
@RequestMapping("/api/v1")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping(value = "/todos/add", produces = "application/json", consumes = "application/json")
    public ResponseEntity<TodoViewDTo> todoAdd(@RequestBody TodoPayloadDTO todoPayloadDTO)
    {
        Todo todo = new Todo();
        todo.setTitle(todoPayloadDTO.getTitle());
        todo.setDescription(todoPayloadDTO.getDescription());

        todo = todoService.createTodo(todo);
        TodoViewDTo todoViewDTo = new TodoViewDTo(todo.getId(), todo.getTitle(), todo.getDescription(), todo.getCreatedAt());



        return ResponseEntity.ok(todoViewDTo);



    }


    @GetMapping(value = "/todos", produces = "application/json")
    public List<TodoViewDTo> todoView(){
        

        List<TodoViewDTo> todoViewDTosList = new ArrayList<>();

        for (Todo todo1: todoService.findAll()){
            todoViewDTosList.add(new TodoViewDTo(todo1.getId(), todo1.getTitle(), todo1.getDescription(), todo1.getCreatedAt()));
        }
        return todoViewDTosList;


    }

    @DeleteMapping(value = "/todos/{todo_id}/delete")
    public ResponseEntity<String> delete_todo(@PathVariable Long todo_id){
        try {
            Optional<Todo> optionalTodo = todoService.findByTodoId(todo_id);
            Todo todo = new Todo();
//            todoService.deleteTodo(todo);
            if(optionalTodo.isPresent()){
                todo = optionalTodo.get();
            }   
            todoService.deleteTodo(todo);
            return  ResponseEntity.status(HttpStatus.ACCEPTED).body("Successfully deleted todo : " + todo.getTitle());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

        }

    }



}

package com.bishnah.todong.controller;

import com.bishnah.todong.model.Account;
import com.bishnah.todong.model.Todo;
import com.bishnah.todong.payload.TodoPayloadDTO;
import com.bishnah.todong.payload.TodoViewDTo;
import com.bishnah.todong.service.AccountService;
import com.bishnah.todong.service.TodoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.AccountNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
@RequestMapping("/api/v1")
@Tag(name = "Todo Controller", description = "Controller for Todo Management")
public class TodoController {

    private final TodoService todoService;
    private final AccountService accountService;

    public TodoController(TodoService todoService, AccountService accountService) {
        this.todoService = todoService;
        this.accountService = accountService;
    }
    @PostMapping(value = "/todos/add", produces = "application/json", consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED) //optional
    @Operation(summary = "Add a Todo")
    @SecurityRequirement(name = "todo-ng-api")
    public ResponseEntity<TodoViewDTo> todoAdd(@Valid  @RequestBody TodoPayloadDTO todoPayloadDTO,
                                               Authentication authentication) {
        try {
            Todo todo = new Todo();
            todo.setTitle(todoPayloadDTO.getTitle());
            todo.setDescription(todoPayloadDTO.getDescription());

            String email = authentication.getName();
            Optional<Account> optionalAccount = accountService.findByEmail(email);
            if(optionalAccount.isPresent()) {
                Account account = optionalAccount.get();
                todo.setAccount(account);
            }
                todo = todoService.createTodo(todo);

            TodoViewDTo todoViewDTo = new TodoViewDTo(todo.getId(), todo.getTitle(), todo.getDescription());
            return ResponseEntity.ok(todoViewDTo);

        } catch (Exception e) {
            log.debug(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping(value = "/todos", produces = "application/json")
    public List<TodoViewDTo> todoView(){
        

        List<TodoViewDTo> todoViewDTosList = new ArrayList<>();

        for (Todo todo1: todoService.findAll()){
            todoViewDTosList.add(new TodoViewDTo(todo1.getId(), todo1.getTitle(), todo1.getDescription())); //, todo1.getCreatedAt()
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

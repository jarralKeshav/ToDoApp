package com.bishnah.todong.service;

import com.bishnah.todong.model.Todo;
import com.bishnah.todong.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {
    @Autowired
    TodoRepository todoRepository;

    public Todo createTodo(Todo todo){
        return todoRepository.save(todo);
    }

        public Optional<Todo> findByTodoId(Long id){
        return todoRepository.findById(id);
    }

    public List<Todo> findAll(){
        return todoRepository.findAll();
    }

    public void deleteTodo(Todo todo){
         todoRepository.delete(todo);

    }

}

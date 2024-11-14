package com.bishnah.todong.config;

import com.bishnah.todong.model.Account;
import com.bishnah.todong.model.Todo;
import com.bishnah.todong.service.AccountService;
import com.bishnah.todong.service.TodoService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SeedData implements CommandLineRunner {
    private final AccountService accountService;
    private final TodoService todoService;

    public SeedData(AccountService accountService, TodoService todoService) {
        this.accountService = accountService;
        this.todoService = todoService;
    }

    @Override
    public void run(String... args) throws Exception {

        Account account01 = new Account();
        Account account02 = new Account();


        account01.setEmail("user@user.com");
        account01.setPassword("userPassword");
        accountService.createAccount(account01);


        account02.setEmail("user2@user.com");
        account02.setPassword("user2Password");
        accountService.createAccount(account02);

        Todo todo1 = new Todo();

        todo1.setTitle("Hello 1");
        todo1.setDescription("1 description");
        todo1.setAccount(account01);

        todoService.createTodo(todo1);

        Todo todo2 = new Todo();

        todo2.setTitle("Hello 2");
        todo2.setDescription("2 description");
        todo2.setAccount(account02);

        todoService.createTodo(todo2);


        Todo todo3 = new Todo();

        todo3.setTitle("Hello 2");
        todo3.setDescription("2 description");
        todo3.setAccount(account02);

        todoService.createTodo(todo3);

    }
}

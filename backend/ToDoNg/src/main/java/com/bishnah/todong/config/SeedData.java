package com.bishnah.todong.config;

import com.bishnah.todong.model.Account;
import com.bishnah.todong.service.AccountService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class SeedData implements CommandLineRunner {
    private final AccountService accountService;

    public SeedData(AccountService accountService) {
        this.accountService = accountService;
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
    }
}

package com.bishnah.todong.controller;


import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class HomeController {


    @SecurityRequirement(name = "todo-ng-api")
    @GetMapping("/home")
    public String Home(){
        return "Hello World!";
    }
}

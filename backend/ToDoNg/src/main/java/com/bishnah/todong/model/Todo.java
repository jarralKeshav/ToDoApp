package com.bishnah.todong.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "Description")
    private String description;

//    private boolean completed;
//
//    @Column(updatable = false)
//    private LocalDateTime createdAt;
//
//    @PrePersist
//    protected void onCreate(){
//        this.createdAt = LocalDateTime.now();
//    }

    @ManyToOne
    @JoinColumn(name = "account_id", referencedColumnName ="id", nullable = false)
    private Account account;


}

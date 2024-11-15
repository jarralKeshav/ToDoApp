package com.bishnah.todong.repository;

import com.bishnah.todong.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {


    Optional<Account> findByEmail(String email);
}

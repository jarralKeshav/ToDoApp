package com.bishnah.todong.payload.account;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginDTO {

    @Email
    private String email;

    @Size(min = 6, max = 20)
    private String password;
}

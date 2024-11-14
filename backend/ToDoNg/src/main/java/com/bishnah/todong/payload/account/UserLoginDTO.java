package com.bishnah.todong.payload.account;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginDTO {

    @Email
    @Schema(description = "Email Address", example = "user@user.com", requiredMode = Schema.RequiredMode.REQUIRED)
    private String email;

    @Size(min = 6, max = 20)
    @Schema(description = "Password", example = "userPassword", requiredMode = Schema.RequiredMode.REQUIRED, minLength =
            6, maxLength = 20)
    private String password;
}

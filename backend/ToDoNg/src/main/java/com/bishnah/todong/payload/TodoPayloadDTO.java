package com.bishnah.todong.payload;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodoPayloadDTO {

    @NotBlank
    private String title;

    @NotBlank
    private String description;
}

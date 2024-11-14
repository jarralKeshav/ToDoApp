package com.bishnah.todong.payload;

import io.swagger.v3.oas.annotations.media.Schema;
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
    @Schema(description = "Todo name", example = "Travel", requiredMode = Schema.RequiredMode.REQUIRED)
    private String title;

    @NotBlank
    @Schema(description= "Description of the Todo", example = "Description", requiredMode =
            Schema.RequiredMode.REQUIRED)
    private String description;
}

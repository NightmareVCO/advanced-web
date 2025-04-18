package com.icc.web.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.NonNull;
import lombok.Value;

@Value
public class LoginDTO {
    @NotBlank(message = "Username is mandatory")
    @NonNull
    String username;

    @NotBlank(message = "Password is mandatory")
    @NonNull
    String password;

    public static boolean validateNoNull(LoginDTO loginDTO) {
        return loginDTO.username == null || loginDTO.password == null;
    }
}
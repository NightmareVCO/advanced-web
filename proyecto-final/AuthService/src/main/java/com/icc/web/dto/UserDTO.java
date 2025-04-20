package com.icc.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Value;

@Value
public class UserDTO {
    @NotBlank(message = "First name is mandatory")
    @NotNull
    String firstName;

    @NotBlank(message = "Last name is mandatory")
    @NotNull
    String lastName;

    @NotBlank(message = "Username is mandatory")
    @NotNull
    String username;

    @NotBlank(message = "Email is mandatory")
    @NotNull
    @Email
    String email;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @NotNull
    String password;

    @NotBlank(message = "Role is mandatory")
    @NotNull
    String role;

    public static boolean validateNoNull(UserDTO userDTO) {
        return userDTO.firstName == null
                || userDTO.lastName == null
                || userDTO.username == null
                || userDTO.email == null;
    }
}

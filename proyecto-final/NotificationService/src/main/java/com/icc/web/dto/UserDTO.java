package com.icc.web.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Value;

@Value
public class UserDTO {

    @NotBlank(message = "El correo no puede estar vacío")
    @Email(message = "Formato de correo inválido")
    String email;

    @NotBlank(message = "El nombre no puede estar vacío")
    String name;

    @NotBlank(message = "El apellido no puede estar vacío")
    String lastName;
}

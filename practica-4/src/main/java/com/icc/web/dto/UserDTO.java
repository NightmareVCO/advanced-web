package com.icc.web.dto;

import java.util.Set;

import com.icc.web.model.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class UserDTO {

  Long id;

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

  // @NotBlank(message = "Password is mandatory")
  // @NotNull
  // @Min(value = 8, message = "Password must be at least 8 characters long")
  String password;

  @NotBlank(message = "Role is mandatory")
  @NotNull
  Set<Role> roles;

  public static boolean validateNoNull(UserDTO userDTO) {
    return userDTO.firstName == null || userDTO.lastName == null || userDTO.username == null || userDTO.email == null;
  }
}

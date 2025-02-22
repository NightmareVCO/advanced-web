package com.icc.web.dto;

import java.util.Set;

import com.icc.web.model.Role;

import lombok.Value;

@Value
public class UserResponseDTO {
  Long id;
  String firstName;
  String lastName;
  String username;
  String email;
  Set<Role> roles;
  boolean active;
}

package com.icc.web.dto;

import lombok.Value;

@Value
public class UserResponseDTO {
  Long id;
  String firstName;
  String lastName;
  String username;
  String email;
}

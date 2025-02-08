package com.icc.web.dto;

import lombok.Value;

@Value
public class UserDTO {
  String firstName;
  String lastName;
  String username;
  String email;
  String password;
}

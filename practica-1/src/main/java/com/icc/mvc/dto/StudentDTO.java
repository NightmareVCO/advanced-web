package com.icc.mvc.dto;

import lombok.Value;

@Value
public class StudentDTO {
  Long id;
  String firstName;
  String lastName;
  String matricula;
  String email;
  String phone;
}

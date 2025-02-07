package com.icc.web.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType; // nuevo import
import lombok.Data;
import lombok.NoArgsConstructor;
import com.icc.web.enums.Role; // nuevo import

@Data
@Entity
@NoArgsConstructor
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String fistName;
  private String lastName;
  private String username;
  private String email;
  private String password;

  @Enumerated(EnumType.STRING)
  private Role role;
}

package com.icc.web.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String firstName;
  private String lastName;
  private String username;
  private String email;
  private String password;
  private boolean active;

  @Singular
  @ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST,
      CascadeType.REFRESH })
  private Set<Role> roles;

  @OneToMany(mappedBy = "owner")
  private Set<Project> projects;


}
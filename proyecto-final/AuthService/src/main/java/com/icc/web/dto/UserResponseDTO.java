package com.icc.web.dto;

import lombok.Value;

@Value
public class UserResponseDTO {
    String id;
    String name;
    String lastname;
    String username;
    String email;
    String role;
    boolean active;
}

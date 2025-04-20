package com.icc.web.dto;

import lombok.Value;
import org.bson.types.ObjectId;

@Value
public class UserResponseDTO {
    ObjectId id;
    String firstName;
    String lastName;
    String username;
    String email;
    String role;
    boolean active;
}

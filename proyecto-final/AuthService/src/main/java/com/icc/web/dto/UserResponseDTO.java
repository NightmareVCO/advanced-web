package com.icc.web.dto;

import lombok.Value;
import org.bson.types.ObjectId;

@Value
public class UserResponseDTO {
    ObjectId id;
    String name;
    String lastname;
    String username;
    String email;
    String role;
    boolean active;
}

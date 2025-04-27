package com.icc.web.dto;

import lombok.Value;
import org.bson.types.ObjectId;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.icc.web.util.ObjectIdDeserializer;
import com.icc.web.util.ObjectIdSerializer;

@Value
public class UserResponseDTO {
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    @JsonSerialize(using = ObjectIdSerializer.class)
    ObjectId id;
    String firstName;
    String lastName;
    String username;
    String email;
    String role;
    boolean active;
}

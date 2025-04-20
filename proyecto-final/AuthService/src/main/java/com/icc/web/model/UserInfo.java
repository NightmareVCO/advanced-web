package com.icc.web.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.icc.web.util.ObjectIdDeserializer;
import com.icc.web.util.ObjectIdSerializer;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class UserInfo {

    @Id
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    @JsonSerialize(using = ObjectIdSerializer.class)
    private ObjectId id;

    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String role;

    @Builder.Default private boolean active = true;
}

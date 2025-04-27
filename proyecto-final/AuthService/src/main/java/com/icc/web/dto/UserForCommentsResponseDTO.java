package com.icc.web.dto;

import org.bson.types.ObjectId;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.icc.web.util.ObjectIdDeserializer;
import com.icc.web.util.ObjectIdSerializer;

import lombok.Value;

@Value
public class UserForCommentsResponseDTO {
  @JsonDeserialize(using = ObjectIdDeserializer.class)
  @JsonSerialize(using = ObjectIdSerializer.class)
  ObjectId id;
  String firstName;
  String lastName;
}

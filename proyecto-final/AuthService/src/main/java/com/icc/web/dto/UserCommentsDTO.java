package com.icc.web.dto;

import java.util.List;

import org.bson.types.ObjectId;

import lombok.Value;

@Value
public class UserCommentsDTO {
  List<ObjectId> ids;
}

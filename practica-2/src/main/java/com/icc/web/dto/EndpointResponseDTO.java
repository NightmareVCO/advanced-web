package com.icc.web.dto;

import lombok.Value;
import java.time.LocalDateTime;
import java.util.List;

@Value
public class EndpointResponseDTO {
  Long id;
  String name;
  String description;
  String path;
  String method;
  boolean status;
  int delay;
  boolean security;
  LocalDateTime expirationDate;
  String encoding;
  String responseType;
  String responseStatus;
  String jwt;
  String body;
  Long projectId;
  List<HeaderResponseDTO> headers;
}
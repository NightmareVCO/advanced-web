package com.icc.web.dto;

import lombok.Value;
import java.time.LocalDateTime;
import java.util.Set;

@Value
public class EndpointDTO {
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
    String JWT;
    String body;
    Long projectId;
    Set<HeaderDTO> headers;
}
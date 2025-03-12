/* (C)2025 */
package com.icc.web.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Value;

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

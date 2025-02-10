package com.icc.web.dto;

import lombok.Value;
import java.time.LocalDateTime;
import java.util.Set;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.NotBlank;

@Value
public class EndpointDTO {
    Long id;

    @NotBlank(message = "Name is mandatory")
    @NonNull
    String name;

    @NotBlank(message = "Description is mandatory")
    @NonNull
    String description;

    @NotBlank(message = "Path is mandatory")
    @NonNull
    String path;

    @NotBlank(message = "Method is mandatory")
    @NonNull
    String method;

    @NonNull
    boolean status;

    @NotBlank(message = "Delay is mandatory")
    @NonNull
    int delay;

    @NonNull
    boolean security;

    @NotBlank(message = "Expiration date is mandatory")
    @NonNull
    LocalDateTime expirationDate;

    @NotBlank(message = "Encoding is mandatory")
    @NonNull
    String encoding;

    @NotBlank(message = "Response type is mandatory")
    @NonNull
    String responseType;

    @NotBlank(message = "Response status is mandatory")
    @NonNull
    String responseStatus;

    String jwt;

    @NotBlank(message = "Body is mandatory")
    @NonNull
    String body;

    @NonNull
    Long projectId;

    Set<HeaderDTO> headers;

    public static boolean validateNoNull(EndpointDTO endpointDTO) {
        return endpointDTO.name == null || endpointDTO.description == null || endpointDTO.path == null
                || endpointDTO.method == null
                || endpointDTO.expirationDate == null || endpointDTO.encoding == null
                || endpointDTO.responseType == null || endpointDTO.responseStatus == null || endpointDTO.body == null
                || endpointDTO.projectId == null;
    }
}
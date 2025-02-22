package com.icc.web.dto;

import io.micrometer.common.lang.NonNull;
import jakarta.validation.constraints.NotBlank;
import lombok.Value;

@Value
public class HeaderDTO {
    Long id;

    @NotBlank(message = "Key is mandatory")
    @NonNull
    String key;

    @NotBlank(message = "Value is mandatory")
    @NonNull
    String value;

    @NonNull
    EndpointResponseDTO endpoint;
}
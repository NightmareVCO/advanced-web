package com.icc.web.dto;

import lombok.Value;

@Value
public class AuthResponseDTO {
    String token;
    String role;
    long expiresIn;
}

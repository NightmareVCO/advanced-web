package com.icc.web.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Value;

@Value
public class CartItemDTO {
    @NotBlank private String bookId;
    @NotBlank private String userId;
}

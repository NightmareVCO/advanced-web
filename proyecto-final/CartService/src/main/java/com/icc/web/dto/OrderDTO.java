package com.icc.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Value;

@Value
public class OrderDTO {
    @NotBlank String userId;

    @NotEmpty OderItemDTO[] items;

    @Min(0)
    double totalPrice;
}

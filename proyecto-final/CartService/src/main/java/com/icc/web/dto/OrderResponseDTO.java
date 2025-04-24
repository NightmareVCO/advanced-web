package com.icc.web.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;

public class OrderResponseDTO {

    @NotEmpty OderItemDTO[] items;

    @Min(0)
    double totalPrice;
}

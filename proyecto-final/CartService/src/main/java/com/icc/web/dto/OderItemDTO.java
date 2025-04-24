package com.icc.web.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Value;

@Value
public class OderItemDTO {
    @NotBlank() String bookId;
}

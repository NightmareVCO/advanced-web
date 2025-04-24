package com.icc.web.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Value;

@Value
public class BookDTO {

    @NotBlank(message = "El título no puede estar vacío")
    String title;

    @NotBlank(message = "La descripción no puede estar vacía")
    String description;

    @NotBlank(message = "El autor no puede estar vacío")
    String author;

    @Positive(message = "El precio debe ser mayor que 0")
    double price;

    @NotBlank(message = "La URL de la portada no puede estar vacía")
    String cover;
}

package com.icc.web.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Value;

import java.util.Date;
import java.util.List;

@Value
public class UserPurchaseDTO {

    @NotNull(message = "La información del usuario no puede ser nula")
    @Valid
    InfoDTO userInfo;

    @NotEmpty(message = "La lista de libros no puede estar vacía")
    @Valid
    List<BookDTO> bookInfo;

    @Positive(message = "El precio total debe ser mayor que 0")
    double totalPrice;

    @NotNull(message = "La fecha de compra no puede ser nula")
    Date purchaseDate;
}

package com.icc.web.dto;

import java.time.LocalDateTime;

import lombok.Value;

@Value
public class OrderResponseDTO {
    String id;
    OrderItemResponseDTO[] items;
    double totalPrice;
    LocalDateTime createDate;
}

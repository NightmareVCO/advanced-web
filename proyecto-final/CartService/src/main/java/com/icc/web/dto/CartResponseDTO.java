package com.icc.web.dto;

import java.util.List;
import lombok.Value;

@Value
public class CartResponseDTO {
    private List<OderItemDTO> items;
}

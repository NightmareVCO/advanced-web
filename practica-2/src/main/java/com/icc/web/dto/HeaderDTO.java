package com.icc.web.dto;

import lombok.Value;

@Value
public class HeaderDTO {
    Long id;
    String key;
    String value;
}
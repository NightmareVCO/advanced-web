package com.icc.web.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Header {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String key;
    private String value;

    @ManyToOne
    private Endpoint endpoint;
}

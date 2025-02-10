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

    @Column(name = "header_key")
    private String key;

    @Column(name = "header_value")
    private String value;

    @ManyToOne
    private Endpoint endpoint;
}

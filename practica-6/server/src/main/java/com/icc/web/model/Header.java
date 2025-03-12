/* (C)2025 */
package com.icc.web.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
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

    @ManyToOne private Endpoint endpoint;
}

package com.icc.web.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Endpoint {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String path;
    private String method;
    private int delay;
    private LocalDateTime expirationDate;
    private String encoding;
    private String responseType;
    private String responseStatus;
    private String jwt;
    private String body;

    @Builder.Default
    private boolean status = true;

    @Builder.Default
    private boolean security = false;

    @ManyToOne
    private Project project;

    @OneToMany(mappedBy = "endpoint", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Header> headers;
}
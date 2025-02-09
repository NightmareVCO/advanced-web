package com.icc.web.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {
    @Id
    private Long id;
    private String name;
    private String owner;
    private String desc;
    private String tag;

    @ManyToMany
    private Set<User> team;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Endpoint> endpoints;

    private boolean isPublic;
}
/* (C)2025 */
package com.icc.web.model;

import jakarta.persistence.*;
import java.util.Set;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    private String password;

    @Builder.Default private boolean active = true;

    @Singular
    @ManyToMany(
            fetch = FetchType.EAGER,
            cascade = {
                CascadeType.DETACH,
                CascadeType.MERGE,
                CascadeType.PERSIST,
                CascadeType.REFRESH
            })
    private Set<Role> roles;

    @OneToMany(mappedBy = "owner")
    private Set<Project> projects;
}

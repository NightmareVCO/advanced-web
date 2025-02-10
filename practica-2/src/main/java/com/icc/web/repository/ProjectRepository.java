package com.icc.web.repository;

import com.icc.web.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByStatus(boolean status);

    Optional<Project> findByIdAndStatus(Long id, boolean status);

    List<Project> findByOwnerUsername(String username);

}
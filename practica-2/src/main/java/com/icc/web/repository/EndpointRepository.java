package com.icc.web.repository;

import com.icc.web.model.Endpoint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EndpointRepository extends JpaRepository<Endpoint, Long> {
    List<Endpoint> findByStatus(boolean status);
    Optional<Endpoint> findByIdAndStatus(Long id, boolean status);
    Optional<Endpoint> findByPathAndMethod(String path, String method);
    boolean existsByPathAndProjectId(String path, Long projectId);

}
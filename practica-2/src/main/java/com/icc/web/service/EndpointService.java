package com.icc.web.service;

import com.icc.web.model.Endpoint;
import com.icc.web.repository.EndpointRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class EndpointService {
    private final EndpointRepository endpointRepository;

    public Optional<Endpoint> getEndpointByPathAndMethod(String path, String method) {
        return endpointRepository.findByPathAndMethod(path, method);
    }

    public List<Endpoint> getAllEndpoints() {
        return endpointRepository.findByStatus(true);
    }

    public Optional<Endpoint> getEndpointById(Long id) {
        return endpointRepository.findByIdAndStatus(id, true);
    }

    public Optional<Endpoint> saveEndpoint(Endpoint endpoint) {
        return Optional.of(endpointRepository.save(endpoint));
    }

    public Endpoint updateEndpoint(Endpoint endpoint) {
        return endpointRepository.save(endpoint);
    }

    public void deleteEndpoint(Long id) {
        endpointRepository.findById(id).ifPresent(endpoint -> {
            endpoint.setStatus(false);
            endpointRepository.save(endpoint);
        });
    }
}
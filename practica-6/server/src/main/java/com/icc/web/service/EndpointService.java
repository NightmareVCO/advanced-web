/* (C)2025 */
package com.icc.web.service;

import com.icc.web.model.Endpoint;
import com.icc.web.model.Header;
import com.icc.web.repository.EndpointRepository;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EndpointService {
    private final EndpointRepository endpointRepository;
    private final HeaderService headerService;

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

    public Optional<Endpoint> updateEndpoint(Endpoint newEndpoint, Long id) {
        Optional<Endpoint> existingEndpointOpt = this.getEndpointById(id);
        if (existingEndpointOpt.isEmpty()) {
            return Optional.empty();
        }

        Endpoint existingEndpoint = existingEndpointOpt.get();

        existingEndpoint.setName(newEndpoint.getName());
        existingEndpoint.setDescription(newEndpoint.getDescription());
        existingEndpoint.setPath(newEndpoint.getPath());
        existingEndpoint.setMethod(newEndpoint.getMethod());
        existingEndpoint.setDelay(newEndpoint.getDelay());
        existingEndpoint.setExpirationDate(newEndpoint.getExpirationDate());
        existingEndpoint.setEncoding(newEndpoint.getEncoding());
        existingEndpoint.setResponseType(newEndpoint.getResponseType());
        existingEndpoint.setResponseStatus(newEndpoint.getResponseStatus());
        existingEndpoint.setJwt(newEndpoint.getJwt());
        existingEndpoint.setBody(newEndpoint.getBody());
        existingEndpoint.setStatus(newEndpoint.isStatus());
        existingEndpoint.setSecurity(newEndpoint.isSecurity());

        // Store existing headers IDs
        List<Long> headerIds = existingEndpoint.getHeaders().stream().map(Header::getId).toList();

        // Clear the collection first
        existingEndpoint.getHeaders().clear();

        // Save to update the collection
        endpointRepository.save(existingEndpoint);

        // Delete old headers from database
        headerIds.forEach(headerService::deleteHeader);

        // Add new headers
        if (newEndpoint.getHeaders() != null) {
            newEndpoint
                    .getHeaders()
                    .forEach(
                            header -> {
                                Header newHeader = new Header();
                                newHeader.setKey(header.getKey());
                                newHeader.setValue(header.getValue());
                                newHeader.setEndpoint(existingEndpoint);
                                existingEndpoint.getHeaders().add(newHeader);
                            });
        }
        return Optional.of(endpointRepository.save(existingEndpoint));
    }

    public void deleteEndpoint(Long id) {
        endpointRepository
                .findById(id)
                .ifPresent(
                        endpoint -> {
                            endpoint.setStatus(false);
                            endpointRepository.save(endpoint);
                        });
    }
}

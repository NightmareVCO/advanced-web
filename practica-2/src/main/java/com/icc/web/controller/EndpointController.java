package com.icc.web.controller;

import com.icc.web.dto.EndpointDTO;
import com.icc.web.exception.BadRequestException;
import com.icc.web.exception.ResourceNotFoundException;
import com.icc.web.mapper.EndpointMapper;
import com.icc.web.model.Endpoint;
import com.icc.web.model.Project;
import com.icc.web.repository.EndpointRepository;
import com.icc.web.repository.ProjectRepository;
import com.icc.web.service.EndpointService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/endpoint/")
public class EndpointController {

    private final EndpointRepository repository;
    private final ProjectRepository projectRepository;
    private final EndpointService endpointService;

    public EndpointController(EndpointRepository repository, ProjectRepository projectRepository, EndpointService endpointService) {
        this.repository = repository;
        this.projectRepository = projectRepository;
        this.endpointService = endpointService;
    }

    @RequestMapping(value = "/**", method = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.OPTIONS })
    public ResponseEntity<String> handleDynamicRequest(HttpServletRequest request) throws InterruptedException {
        String path = request.getRequestURI().replace("/api/endpoint/", "");
        String method = request.getMethod();

        Optional<Endpoint> endpoint = repository.findByPathAndMethod(path, method);

        if (endpoint.isPresent()) {
            Endpoint endpointMock = endpoint.get();

            if (endpointMock.getDelay() > 0) {
                Thread.sleep(endpointMock.getDelay() * 1000L);
            }

            return ResponseEntity.status(Integer.parseInt(endpointMock.getResponseStatus()))
                    .contentType(MediaType.parseMediaType(endpointMock.getResponseType()))
                    .body(endpointMock.getBody());
        }

        throw new ResourceNotFoundException("Endpoint not found");
    }

    @GetMapping
    public ResponseEntity<List<EndpointDTO>> getAllEndpoints() {
        List<Endpoint> endpoints = endpointService.getAllEndpoints();
        List<EndpointDTO> endpointDTOs = EndpointMapper.INSTANCE.endpointsToDtos(endpoints);
        if (endpointDTOs.isEmpty())
            throw new ResourceNotFoundException("No Endpoints Found");

        return new ResponseEntity<>(endpointDTOs, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<EndpointDTO> getEndpointById(@PathVariable Long id) {
        Optional<Endpoint> endpointOptional = endpointService.getEndpointById(id);

        if (endpointOptional.isEmpty()) {
            throw new ResourceNotFoundException("Endpoint not found");
        }

        EndpointDTO endpointDTO = EndpointMapper.INSTANCE.endpointToDto(endpointOptional.get());
        return new ResponseEntity<>(endpointDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<EndpointDTO> createEndpoint(@RequestBody EndpointDTO endpointDTO) {

        Endpoint endpoint = EndpointMapper.INSTANCE.dtoToEndpoint(endpointDTO);
        Endpoint savedEndpoint = repository.save(endpoint);

        if (savedEndpoint.getPath().trim().isEmpty())
            throw new BadRequestException("Path cannot be empty");

        if (repository.existsByPathAndProjectId(savedEndpoint.getPath(), savedEndpoint.getProject().getId()))
            throw new BadRequestException("Endpoint with the same path and project ID already exists");

        final Optional<Project> currentProject = projectRepository.findById(savedEndpoint.getProject().getId());

        if (currentProject.isEmpty())
            throw new BadRequestException("Assigned project ID is invalid");

        savedEndpoint.setProject(currentProject.get());

        EndpointDTO createdEndpoint = EndpointMapper.INSTANCE.endpointToDto(savedEndpoint);

        return new ResponseEntity<>(createdEndpoint, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteEndpoint(@PathVariable Long id) {
        endpointService.deleteEndpoint(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("{id}")
    public ResponseEntity<EndpointDTO> editEndpoint(@PathVariable Long id, @RequestBody EndpointDTO endpointDTO) {
        Optional<Endpoint> endpointOptional = endpointService.getEndpointById(id);

        if (endpointOptional.isEmpty()) {
            throw new ResourceNotFoundException("Endpoint not found");
        }

        Endpoint existingEndpoint = endpointOptional.get();

        if (endpointDTO.getName() != null) existingEndpoint.setName(endpointDTO.getName());
        if (endpointDTO.getDescription() != null) existingEndpoint.setDescription(endpointDTO.getDescription());
        if (endpointDTO.getPath() != null) existingEndpoint.setPath(endpointDTO.getPath());
        if (endpointDTO.getMethod() != null) existingEndpoint.setMethod(endpointDTO.getMethod());
        if (endpointDTO.isStatus() != existingEndpoint.isStatus()) existingEndpoint.setStatus(endpointDTO.isStatus());
        if (endpointDTO.getDelay() != 0) existingEndpoint.setDelay(endpointDTO.getDelay());
        if (endpointDTO.isSecurity() != existingEndpoint.isSecurity()) existingEndpoint.setSecurity(endpointDTO.isSecurity());
        if (endpointDTO.getExpirationDate() != null) existingEndpoint.setExpirationDate(endpointDTO.getExpirationDate());
        if (endpointDTO.getEncoding() != null) existingEndpoint.setEncoding(endpointDTO.getEncoding());
        if (endpointDTO.getResponseType() != null) existingEndpoint.setResponseType(endpointDTO.getResponseType());
        if (endpointDTO.getResponseStatus() != null) existingEndpoint.setResponseStatus(endpointDTO.getResponseStatus());
        if (endpointDTO.getJWT() != null) existingEndpoint.setJWT(endpointDTO.getJWT());
        if (endpointDTO.getBody() != null) existingEndpoint.setBody(endpointDTO.getBody());
        if (endpointDTO.getProjectId() != null) {
            Optional<Project> projectOptional = projectRepository.findById(endpointDTO.getProjectId());
            if (projectOptional.isEmpty()) {
                throw new BadRequestException("Assigned project ID is invalid");
            }
            existingEndpoint.setProject(projectOptional.get());
        }

        Endpoint updatedEndpoint = endpointService.updateEndpoint(existingEndpoint);
        EndpointDTO updatedEndpointDTO = EndpointMapper.INSTANCE.endpointToDto(updatedEndpoint);

        return new ResponseEntity<>(updatedEndpointDTO, HttpStatus.OK);
    }

}
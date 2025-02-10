package com.icc.web.controller;

import com.icc.web.dto.EndpointDTO;
import com.icc.web.dto.ProjectDTO;
import com.icc.web.exception.BadRequestException;
import com.icc.web.exception.ForbiddenException;
import com.icc.web.exception.InternalServerError;
import com.icc.web.exception.ResourceNotFoundException;
import com.icc.web.mapper.EndpointMapper;
import com.icc.web.model.Endpoint;
import com.icc.web.model.Project;
import com.icc.web.repository.EndpointRepository;
import com.icc.web.repository.ProjectRepository;
import com.icc.web.service.EndpointService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/endpoint/")
@RequiredArgsConstructor

// http://localhost:8080/api/v1/endpoint/projects/1/api/users
public class EndpointController {

    private final EndpointService endpointService;
    private final ProjectRepository projectRepository;

    @RequestMapping(value = "**", method = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
            RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.OPTIONS })
    public ResponseEntity<String> handleDynamicRequest(HttpServletRequest request) throws InterruptedException {
        String path = request.getRequestURI().replace("/api/v1/endpoint/", "");
        String method = request.getMethod();

        Optional<Endpoint> endpoint = endpointService.getEndpointByPathAndMethod(path, method);
        if (endpoint.isEmpty()) {
            throw new ResourceNotFoundException("Endpoint not found");
        }

        Endpoint endpointMock = endpoint.get();

        if (endpointMock.getDelay() > 0) {
            Thread.sleep(endpointMock.getDelay() * 1000L);
        }

        int statusCode = Integer.parseInt(endpointMock.getResponseStatus());
        MediaType contentType = MediaType.parseMediaType(endpointMock.getResponseType());
        String body = endpointMock.getBody();

        return ResponseEntity
                .status(statusCode)
                .contentType(contentType)
                .body(body);

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
        if (EndpointDTO.validateNoNull(endpointDTO)) {
            throw new ForbiddenException("All fields are mandatory");
        }

        Optional<Project> project = projectRepository.findById(endpointDTO.getProjectId());
        if (project.isEmpty()) {
            throw new BadRequestException("Project not found");
        }

        Endpoint endpoint = EndpointMapper.INSTANCE.dtoToEndpoint(endpointDTO);
        endpoint.setProject(project.get());

        if (endpointService.getEndpointByPathAndMethod(endpoint.getPath(), endpoint.getMethod()).isPresent()) {
            throw new BadRequestException("Endpoint with the same path and method already exists");
        }

        Optional<Endpoint> savedEndpoint = endpointService.saveEndpoint(endpoint);
        if (savedEndpoint.isEmpty()) {
            throw new InternalServerError("Internal Server Error");
        }

        EndpointDTO createdEndpoint = EndpointMapper.INSTANCE.endpointToDto(savedEndpoint.get());

        return new ResponseEntity<>(createdEndpoint, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteEndpoint(@PathVariable Long id) {
        endpointService.deleteEndpoint(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // @PatchMapping("{id}")
    // public ResponseEntity<EndpointDTO> editEndpoint(@PathVariable Long id,
    // @RequestBody EndpointDTO endpointDTO) {
    // Optional<Endpoint> endpointOptional = endpointService.getEndpointById(id);

    // if (endpointOptional.isEmpty()) {
    // throw new ResourceNotFoundException("Endpoint not found");
    // }

    // Endpoint existingEndpoint = endpointOptional.get();
    // Endpoint updatedEndpoint = endpointService.updateEndpoint(existingEndpoint);
    // EndpointDTO updatedEndpointDTO =
    // EndpointMapper.INSTANCE.endpointToDto(updatedEndpoint);

    // return new ResponseEntity<>(updatedEndpointDTO, HttpStatus.OK);
    // }

}
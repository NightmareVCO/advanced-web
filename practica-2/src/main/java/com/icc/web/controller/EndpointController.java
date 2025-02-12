package com.icc.web.controller;

import com.icc.web.dto.AuthResponseDTO;
import com.icc.web.dto.EndpointDTO;
import com.icc.web.dto.EndpointResponseDTO;
import com.icc.web.exception.BadRequestException;
import com.icc.web.exception.ForbiddenException;
import com.icc.web.exception.InternalServerError;
import com.icc.web.exception.ResourceNotFoundException;
import com.icc.web.mapper.EndpointMapper;
import com.icc.web.model.Endpoint;
import com.icc.web.model.Project;
import com.icc.web.repository.ProjectRepository;
import com.icc.web.service.EndpointService;
import com.icc.web.service.JWTService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/endpoint/")
@RequiredArgsConstructor

// http://localhost:8080/api/v1/endpoint/projects/1/api/users
public class EndpointController {

    private final EndpointService endpointService;
    private final ProjectRepository projectRepository;
    private final JWTService jwtService;

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

        if (endpointMock.getExpirationDate() != null
                && endpointMock.getExpirationDate().isBefore(LocalDateTime.now())) {
            endpointMock.setStatus(false);
            Optional<Endpoint> expiredEndpoint = endpointService.saveEndpoint(endpointMock);
            if (expiredEndpoint.isEmpty()) {
                throw new InternalServerError("Internal Server Error");
            }

            throw new ForbiddenException("Endpoint have expired");
        }

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
    public ResponseEntity<List<EndpointResponseDTO>> getAllEndpoints() {
        List<Endpoint> endpoints = endpointService.getAllEndpoints();
        List<EndpointResponseDTO> endpointsResponseDTOs = EndpointMapper.INSTANCE.endpointsToResponseDtos(endpoints);
        if (endpointsResponseDTOs.isEmpty())
            throw new ResourceNotFoundException("No Endpoints Found");

        return new ResponseEntity<>(endpointsResponseDTOs, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<EndpointDTO> getEndpointById(@PathVariable Long id) {
        Optional<Endpoint> endpointOptional = endpointService.getEndpointById(id);

        if (endpointOptional.isEmpty()) {
            throw new ResourceNotFoundException("Endpoint not found");
        }

        EndpointDTO endpointDTO = EndpointMapper.INSTANCE.endpointToDto(endpointOptional.get());
        if (endpointDTO == null) {
            throw new InternalServerError("Internal Server Error");
        }

        return new ResponseEntity<>(endpointDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<EndpointDTO> createEndpoint(@RequestBody EndpointDTO endpointDTO) {
        AuthResponseDTO jwt = null;

        if (EndpointDTO.validateNoNull(endpointDTO)) {
            throw new ForbiddenException("All fields are mandatory");
        }

        Optional<Project> project = projectRepository.findById(endpointDTO.getProjectId());
        if (project.isEmpty()) {
            throw new BadRequestException("Project not found");
        }

        if (endpointService.getEndpointByPathAndMethod(endpointDTO.getPath(), endpointDTO.getMethod()).isPresent()) {
            throw new BadRequestException("Endpoint with the same path and method already exists");
        }

        Endpoint endpoint = EndpointMapper.INSTANCE.dtoToEndpoint(endpointDTO);
        endpoint.setProject(project.get());

        Optional<Endpoint> savedEndpoint = endpointService.saveEndpoint(endpoint);
        if (savedEndpoint.isEmpty()) {
            throw new InternalServerError("Internal Server Error");
        }

        if (endpoint.isSecurity()) {
            jwt = jwtService.createTokenForEndpoint(endpoint.getProject().getId().toString(),
                    endpoint.getId().toString(), endpoint.getExpirationDate());
        }

        if (jwt != null) {
            endpoint.setJwt(jwt.getToken());
        }

        savedEndpoint = endpointService.saveEndpoint(endpoint);
        if (savedEndpoint.isEmpty()) {
            throw new InternalServerError("Internal Server Error");
        }

        EndpointDTO createdEndpoint = EndpointMapper.INSTANCE.endpointToDto(savedEndpoint.get());
        if (createdEndpoint == null) {
            throw new InternalServerError("Internal Server Error");
        }

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
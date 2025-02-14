package com.icc.web.controller;

import com.icc.web.dto.ProjectDTO;
import com.icc.web.dto.ProjectResponseDTO;
import com.icc.web.enums.ERole;
import com.icc.web.exception.BadRequestException;
import com.icc.web.exception.ForbiddenException;
import com.icc.web.exception.InternalServerError;
import com.icc.web.exception.ResourceNotFoundException;
import com.icc.web.mapper.ProjectMapper;
import com.icc.web.model.Project;
import com.icc.web.model.Role;
import com.icc.web.model.User;
import com.icc.web.service.JWTService;
import com.icc.web.service.ProjectService;
import com.icc.web.service.UserService;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/projects/")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final UserService userService;
    private final JWTService jwtService;

    @GetMapping
    public ResponseEntity<List<ProjectResponseDTO>> getAllProjects(@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);

        Optional<Claims> claims = jwtService.getClaims(jwt);
        if (claims.isEmpty()) {
            throw new BadRequestException("Invalid token");
        }

        if (jwtService.isTokenExpired(jwt)) {
            throw new BadRequestException("Token expired");
        }

        String username = claims.get().get("username", String.class);
        Optional<User> user = userService.getUserByUsername(username);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        Set<Role> roles = user.get().getRoles();
        boolean isAdminRole = roles.stream().anyMatch(role -> role.getName().equals(ERole.ADMIN));

        List<Project> projects = projectService.getAllProjectsByUserId(user.get().getId(), isAdminRole);
        List<ProjectResponseDTO> projectsResponseDTO = ProjectMapper.INSTANCE
                .projectsToResponseDtos(projects);
        if (projectsResponseDTO.isEmpty()) {
            throw new ResourceNotFoundException("No projects found");
        }

        return new ResponseEntity<>(projectsResponseDTO, HttpStatus.OK);
    }

    @GetMapping("public/")
    public ResponseEntity<List<ProjectResponseDTO>> getPublicProjects() {
        List<Project> projects = projectService.getPublicProjects();
        List<ProjectResponseDTO> projectsResponseDTO = ProjectMapper.INSTANCE
                .projectsToResponseDtos(projects);

        return new ResponseEntity<>(projectsResponseDTO, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProjectResponseDTO> getProjectById(@PathVariable Long id,
            @RequestHeader("Authorization") String token) {

        String jwt = token.substring(7);

        Optional<Claims> claims = jwtService.getClaims(jwt);
        if (claims.isEmpty()) {
            throw new BadRequestException("Invalid token");
        }

        if (jwtService.isTokenExpired(jwt)) {
            throw new BadRequestException("Token expired");
        }

        String username = claims.get().get("username", String.class);
        Optional<User> user = userService.getUserByUsername(username);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        Optional<Project> project = projectService.getProjectById(id);
        if (project.isEmpty()) {
            throw new ResourceNotFoundException("Project not found");
        }

        String ownerUsername = project.get().getOwner().getUsername();
        boolean isProjectPublic = project.get().isOpenAccess();
        boolean isUserPartOfTeam = project.get().getTeam().stream().anyMatch(u -> u.getUsername().equals(username));
        boolean isAdminRole = user.get().getRoles().stream().anyMatch(role -> role.getName().equals(ERole.ADMIN));
        if ((!username.equals(ownerUsername) && !isProjectPublic && !isUserPartOfTeam) && !isAdminRole) {
            throw new ForbiddenException("You are not allowed to view this project");
        }

        ProjectResponseDTO projectResponseDTO = ProjectMapper.INSTANCE.projectToResponseDto(project.get());
        if (projectResponseDTO == null) {
            throw new InternalServerError("Internal Server Error");
        }

        return new ResponseEntity<>(projectResponseDTO, HttpStatus.OK);
    }

    @PostMapping("add-user/{username}/to-project/{projectId}")
    public ResponseEntity<ProjectDTO> addUserToTeam(@PathVariable String username, @PathVariable Long projectId,
            @RequestHeader("Authorization") String token) {
        Optional<Project> project = projectService.getProjectById(projectId);
        if (project.isEmpty()) {
            throw new ResourceNotFoundException("Project not found");
        }

        String jwt = token.substring(7);
        Optional<Claims> claims = jwtService.getClaims(jwt);
        if (claims.isEmpty()) {
            throw new BadRequestException("Invalid token");
        }

        if (jwtService.isTokenExpired(jwt)) {
            throw new BadRequestException("Token expired");
        }

        String loggedUsername = claims.get().get("username", String.class);
        String ownerUsername = project.get().getOwner().getUsername();
        if (!loggedUsername.equals(ownerUsername)) {
            throw new ForbiddenException("You are not the owner of the project");
        }

        Optional<User> user = userService.getUserByUsername(username);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        if (claims.get().get("userId", String.class).equals(user.get().getId().toString())) {
            throw new ForbiddenException("You can't add yourself to the team");
        }

        project.get().getTeam().add(user.get());
        Optional<Project> savedProject = projectService.saveProject(project.get());
        if (savedProject.isEmpty()) {
            throw new InternalServerError("Internal Server Error");
        }

        ProjectDTO projectDTO = ProjectMapper.INSTANCE.projectToDto(savedProject.get());
        if (projectDTO == null) {
            throw new InternalServerError("Internal Server Error");
        }

        return new ResponseEntity<>(projectDTO, HttpStatus.OK);
    }

    @DeleteMapping("remove-user/{username}/from-project/{projectId}")
    public ResponseEntity<ProjectDTO> removeUserFromTeam(@PathVariable String username, @PathVariable Long projectId,
            @RequestHeader("Authorization") String token) {
        Optional<Project> project = projectService.getProjectById(projectId);
        if (project.isEmpty()) {
            throw new ResourceNotFoundException("Project not found");
        }

        String jwt = token.substring(7);

        Optional<Claims> claims = jwtService.getClaims(jwt);
        if (claims.isEmpty()) {
            throw new BadRequestException("Invalid token");
        }

        if (jwtService.isTokenExpired(jwt)) {
            throw new BadRequestException("Token expired");
        }

        String loggedUsername = claims.get().get("username", String.class);
        String ownerUsername = project.get().getOwner().getUsername();
        if (!loggedUsername.equals(ownerUsername)) {
            throw new ForbiddenException("You are not the owner of the project");
        }

        Optional<User> user = userService.getUserByUsername(username);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        if (claims.get().get("userId", String.class).equals(user.get().toString())) {
            throw new ForbiddenException("You cannot remove yourself from the team");
        }

        project.get().getTeam().remove(user.get());
        Optional<Project> savedProject = projectService.saveProject(project.get());
        if (savedProject.isEmpty()) {
            throw new InternalServerError("Internal Server Error");
        }

        ProjectDTO projectDTO = ProjectMapper.INSTANCE.projectToDto(savedProject.get());
        if (projectDTO == null) {
            throw new InternalServerError("Internal Server Error");
        }

        return new ResponseEntity<>(projectDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProjectResponseDTO> createProject(@RequestBody ProjectDTO projectDTO,
            @RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);

        Optional<Claims> claims = jwtService.getClaims(jwt);
        if (claims.isEmpty()) {
            throw new BadRequestException("Invalid token");
        }

        if (jwtService.isTokenExpired(jwt)) {
            throw new BadRequestException("Token expired");
        }

        if (ProjectDTO.validateNoNull(projectDTO)) {
            throw new ForbiddenException("All fields are mandatory");
        }

        String loggedUsername = claims.get().get("username", String.class);
        Optional<User> loggedUser = userService.getUserByUsername(loggedUsername);
        if (loggedUser.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        String ownerUsername = projectDTO.getOwner().getUsername();
        if (!loggedUsername.equals(ownerUsername)) {
            throw new ForbiddenException("You are not the owner of the project");
        }

        Optional<User> user = userService.getUserByUsername(projectDTO.getOwner().getUsername());
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        Project project = ProjectMapper.INSTANCE.dtoToProject(projectDTO);
        project.setOwner(user.get());

        Optional<Project> savedProject = projectService.saveProject(project);
        if (savedProject.isEmpty()) {
            throw new ResourceNotFoundException("Project not created");
        }

        ProjectResponseDTO createdProjectDTO = ProjectMapper.INSTANCE.projectToResponseDto(savedProject.get());
        if (createdProjectDTO == null) {
            throw new InternalServerError("Internal Server Error");
        }

        return new ResponseEntity<>(createdProjectDTO, HttpStatus.CREATED);
    }

    @PatchMapping("{id}")
    public ResponseEntity<ProjectResponseDTO> updateProject(@PathVariable Long id, @RequestBody ProjectDTO projectDTO,
            @RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);

        Optional<Claims> claims = jwtService.getClaims(jwt);
        if (claims.isEmpty()) {
            throw new BadRequestException("Invalid token");
        }

        if (jwtService.isTokenExpired(jwt)) {
            throw new BadRequestException("Token expired");
        }

        if (ProjectDTO.validateNoNull(projectDTO)) {
            throw new ForbiddenException("All fields are mandatory");
        }

        Optional<Project> existingProject = projectService.getProjectById(id);
        if (existingProject.isEmpty()) {
            throw new ResourceNotFoundException("Project not found");
        }

        String loggedUsername = claims.get().get("username", String.class);
        String ownerUsername = existingProject.get().getOwner().getUsername();
        if (!loggedUsername.equals(ownerUsername)) {
            throw new ForbiddenException("You are not the owner of the project");
        }

        existingProject.get().setName(projectDTO.getName());
        existingProject.get().setDesc(projectDTO.getDesc());

        Project updatedProject = ProjectMapper.INSTANCE.dtoToProject(projectDTO);
        Optional<User> ownerFromDb = userService.getUserById(existingProject.get().getOwner().getId());
        if (ownerFromDb.isEmpty()) {
            throw new ResourceNotFoundException("Owner not found");
        }
        updatedProject.setOwner(ownerFromDb.get());

        Optional<Project> savedProject = projectService.saveProject(updatedProject);
        if (savedProject.isEmpty()) {
            throw new InternalServerError("Internal Server Error");
        }

        ProjectResponseDTO updatedProjectDTO = ProjectMapper.INSTANCE.projectToResponseDto(savedProject.get());
        if (updatedProjectDTO == null) {
            throw new InternalServerError("Internal Server Error");
        }

        return new ResponseEntity<>(updatedProjectDTO, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
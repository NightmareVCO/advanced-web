package com.icc.web.controller;

import com.icc.web.dto.ProjectDTO;
import com.icc.web.exception.BadRequestException;
import com.icc.web.exception.ForbiddenException;
import com.icc.web.exception.ResourceNotFoundException;
import com.icc.web.mapper.ProjectMapper;
import com.icc.web.mapper.UserMapper;
import com.icc.web.model.Project;
import com.icc.web.model.User;
import com.icc.web.service.ProjectService;
import com.icc.web.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/projects/")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        List<ProjectDTO> projectDTOs = ProjectMapper.INSTANCE.projectsToDtos(projects);
        return new ResponseEntity<>(projectDTOs, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        if (project.isEmpty()) {
            throw new ResourceNotFoundException("Project not found");
        }

        ProjectDTO projectDTO = ProjectMapper.INSTANCE.projectToDto(project.get());

        return new ResponseEntity<>(projectDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO) {
        if (ProjectDTO.validateNoNull(projectDTO)) {
            throw new ForbiddenException("All fields are mandatory");
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

        ProjectDTO createdProjectDTO = ProjectMapper.INSTANCE.projectToDto(savedProject.get());

        return new ResponseEntity<>(createdProjectDTO, HttpStatus.CREATED);
    }

    // implement the updateProject method :C

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
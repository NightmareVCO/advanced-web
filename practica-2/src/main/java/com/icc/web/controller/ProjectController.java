package com.icc.web.controller;

import com.icc.web.dto.ProjectDTO;
import com.icc.web.exception.ResourceNotFoundException;
import com.icc.web.mapper.ProjectMapper;
import com.icc.web.model.Project;
import com.icc.web.service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<List<ProjectDTO>> getAllProjects() {
        List<Project> projects = projectService.getAllProjects();
        List<ProjectDTO> projectDTOs = ProjectMapper.INSTANCE.projectsToDtos(projects);
        return new ResponseEntity<>(projectDTOs, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProjectDTO> getProjectById(@PathVariable Long id) {
        Optional<Project> projectOptional = projectService.getProjectById(id);

        if (projectOptional.isEmpty()) {
            throw new ResourceNotFoundException("Project not found");
        }

        ProjectDTO projectDTO = ProjectMapper.INSTANCE.projectToDto(projectOptional.get());
        return new ResponseEntity<>(projectDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ProjectDTO> createProject(@RequestBody ProjectDTO projectDTO) {
        Project project = ProjectMapper.INSTANCE.dtoToProject(projectDTO);
        Project savedProject = projectService.saveProject(project);
        ProjectDTO createdProjectDTO = ProjectMapper.INSTANCE.projectToDto(savedProject);
        return new ResponseEntity<>(createdProjectDTO, HttpStatus.CREATED);
    }

    //implement the updateProject method :C

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
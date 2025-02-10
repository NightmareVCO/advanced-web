package com.icc.web.service;

import com.icc.web.model.Project;
import com.icc.web.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getAllProjects() {
        return projectRepository.findByStatus(true);
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findByIdAndStatus(id, true);
    }

    public Project saveProject(Project project) {
        project.setStatus(true);
        return projectRepository.save(project);
    }

    public Project updateProject(Project project) {
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        projectRepository.findById(id).ifPresent(project -> {
            project.setStatus(false);
            projectRepository.save(project);
        });
    }
}
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

    public Optional<Project> saveProject(Project project) {
        project.setStatus(true);
        return Optional.of(projectRepository.save(project));
    }

    public Optional<Project> updateProject(Project project) {
        return Optional.of(projectRepository.save(project));
    }

    public void deleteProject(Long id) {
        Optional<Project> project = this.getProjectById(id);
        if (project.isPresent()) {
            project.get().setStatus(false);
            projectRepository.save(project.get());
        }
    }
}
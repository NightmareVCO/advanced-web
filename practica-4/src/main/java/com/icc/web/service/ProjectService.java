package com.icc.web.service;

import com.icc.web.model.Project;
import com.icc.web.repository.ProjectRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findByStatus(true);
    }

    public List<Project> getPublicProjects() {
        return projectRepository.findByStatusAndOpenAccess(true, true);
    }

    public List<Project> getProjectsByOwnerId(Long userId) {
        return projectRepository.findByOwnerIdAndStatus(userId, true);
    }

    public List<Project> getProjectsByTeamMemberId(Long userId) {
        return projectRepository.findByTeamIdAndStatus(userId, true);
    }

    public List<Project> getAllProjectsByUserId(Long userId, boolean isAdmin) {
        List<Project> projects;

        if (isAdmin) {
            return this.getAllProjects();
        }

        // List<Project> publicProjects = this.getPublicProjects();
        List<Project> userProjects = this.getProjectsByOwnerId(userId);
        List<Project> teamProjects = this.getProjectsByTeamMemberId(userId);

        projects = new ArrayList<>();
        // projects.addAll(publicProjects);
        projects.addAll(userProjects);
        projects.addAll(teamProjects);

        return projects.stream().distinct().toList();
    }

    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findByIdAndStatus(id, true);
    }

    public Optional<Project> saveProject(Project project) {
        project.setStatus(true);
        return Optional.ofNullable(projectRepository.save(project));
    }

    public Optional<Project> updateProject(Project project) {
        return Optional.ofNullable(projectRepository.save(project));
    }

    public void deleteProject(Long id) {
        Optional<Project> project = this.getProjectById(id);
        if (project.isPresent()) {
            project.get().setStatus(false);
            projectRepository.save(project.get());
        }
    }
}
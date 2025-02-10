package com.icc.web.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.icc.web.dto.ProjectDTO;
import com.icc.web.model.Project;

@Mapper
public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

    ProjectDTO projectToDto(Project project);

    Project dtoToProject(ProjectDTO projectDTO);

    List<ProjectDTO> projectsToDtos(List<Project> projects);

    List<Project> dtosToProjects(List<ProjectDTO> projectDTOs);
}
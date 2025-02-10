package com.icc.web.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.icc.web.dto.ProjectDTO;
import com.icc.web.model.Project;

@Mapper
public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

    @Mapping(source = "owner.id", target = "ownerId")
    @Mapping(source = "team.id", target = "teamIds")
    @Mapping(source = "endpoints.id", target = "endpointIds")
    ProjectDTO projectToDto(Project project);

    @Mapping(source = "ownerId", target = "owner.id")
    @Mapping(source = "teamIds", target = "team.id")
    @Mapping(source = "endpointIds", target = "endpoints.id")
    Project dtoToProject(ProjectDTO projectDTO);

    List<ProjectDTO> projectsToDtos(List<Project> projects);

    List<Project> dtosToProjects(List<ProjectDTO> projectDTOs);
}
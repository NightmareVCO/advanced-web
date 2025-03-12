/* (C)2025 */
package com.icc.web.mapper;

import com.icc.web.dto.ProjectDTO;
import com.icc.web.dto.ProjectResponseDTO;
import com.icc.web.model.Project;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProjectMapper {
    ProjectMapper INSTANCE = Mappers.getMapper(ProjectMapper.class);

    ProjectDTO projectToDto(Project project);

    Project dtoToProject(ProjectDTO projectDTO);

    List<ProjectDTO> projectsToDtos(List<Project> projects);

    List<Project> dtosToProjects(List<ProjectDTO> projectDTOs);

    ProjectResponseDTO projectToResponseDto(Project project);

    Project responseDtoToProject(ProjectResponseDTO projectResponseDTO);

    List<ProjectResponseDTO> projectsToResponseDtos(List<Project> projects);

    List<Project> responseDtosToProjects(List<ProjectResponseDTO> projectResponseDTOs);
}

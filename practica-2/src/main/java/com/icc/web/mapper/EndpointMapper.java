package com.icc.web.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.icc.web.dto.EndpointDTO;
import com.icc.web.model.Endpoint;

@Mapper
public interface EndpointMapper {
    EndpointMapper INSTANCE = Mappers.getMapper(EndpointMapper.class);

    @Mapping(source = "project.id", target = "projectId")
    EndpointDTO endpointToDto(Endpoint endpoint);

    @Mapping(source = "projectId", target = "project.id")
    Endpoint dtoToEndpoint(EndpointDTO endpointDTO);

    List<EndpointDTO> endpointsToDtos(List<Endpoint> endpoints);

    List<Endpoint> dtosToEndpoints(List<EndpointDTO> endpointDTOs);
}
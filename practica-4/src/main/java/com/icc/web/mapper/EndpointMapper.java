package com.icc.web.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.icc.web.dto.EndpointDTO;
import com.icc.web.dto.EndpointResponseDTO;
import com.icc.web.model.Endpoint;

@Mapper
public interface EndpointMapper {
    EndpointMapper INSTANCE = Mappers.getMapper(EndpointMapper.class);

    EndpointDTO endpointToDto(Endpoint endpoint);

    Endpoint dtoToEndpoint(EndpointDTO endpointDTO);

    EndpointResponseDTO endpointToResponseDto(Endpoint endpoint);

    Endpoint responseDtoToEndpoint(EndpointResponseDTO endpointResponseDTO);

    List<EndpointDTO> endpointsToDtos(List<Endpoint> endpoints);

    List<Endpoint> dtosToEndpoints(List<EndpointDTO> endpointDTOs);

    List<EndpointResponseDTO> endpointsToResponseDtos(List<Endpoint> endpoints);

    List<Endpoint> responseDtosToEndpoints(List<EndpointResponseDTO> endpointResponseDTOs);
}
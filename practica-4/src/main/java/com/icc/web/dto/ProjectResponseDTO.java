package com.icc.web.dto;

import java.util.List;

import lombok.Value;

@Value
public class ProjectResponseDTO {
  Long id;
  private String name;
  private String description;
  private String tag;
  private boolean openAccess;
  private boolean status;
  private UserResponseDTO owner;
  private List<EndpointResponseDTO> endpoints;
  private List<UserResponseDTO> team;
}
package com.icc.web.dto;

import com.icc.web.model.Endpoint;
import lombok.Value;
import java.util.Set;

@Value
public class ProjectDTO {
    Long id;
    String name;
    String desc;
    String tag;
    Boolean status;
    UserDTO owner;
    Set<UserDTO> team;
    Set<Endpoint> endpoints;
    Boolean isPublic;
}
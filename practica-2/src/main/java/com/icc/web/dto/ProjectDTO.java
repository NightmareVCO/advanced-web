package com.icc.web.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.NonNull;
import lombok.Value;

@Value
public class ProjectDTO {
    Long id;
    @NotBlank(message = "Name is mandatory")
    @NonNull
    private String name;

    @NotBlank(message = "Description is mandatory")
    @NonNull
    private String desc;

    @NotBlank(message = "Tag is mandatory")
    @NonNull
    private String tag;

    private boolean openAccess;

    @NonNull
    UserResponseDTO owner;

    public static boolean validateNoNull(ProjectDTO projectDTO) {
        return projectDTO.name == null || projectDTO.desc == null || projectDTO.tag == null || projectDTO.owner == null;
    }
}
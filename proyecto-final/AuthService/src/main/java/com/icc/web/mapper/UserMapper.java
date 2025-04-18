package com.icc.web.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.icc.web.dto.UserDTO;
import com.icc.web.dto.UserResponseDTO;
import com.icc.web.model.UserInfo;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO userToDto(UserInfo user);

    UserInfo dtoToUserDTO(UserDTO userDTO);

    UserInfo responseDtoToUser(UserResponseDTO userResponseDTO);

    UserResponseDTO userToResponseDto(UserInfo user);

    List<UserDTO> usersToDtos(List<UserInfo> users);

    List<UserInfo> dtosToUsers(List<UserDTO> userDTOs);

    List<UserResponseDTO> usersToResponseDtos(List<UserInfo> users);

    List<UserInfo> responseDtosToUsers(List<UserResponseDTO> userResponseDTOs);
}
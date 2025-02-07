package com.icc.web.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.icc.web.dto.UserDTO;
import com.icc.web.model.User;

@Mapper
public interface UserMapper {
  UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

  UserDTO userToDto(User user);

  User dtoToStudent(UserDTO studentDTO);

  List<UserDTO> usersToDtos(List<User> users);

  List<User> dtosToUsers(List<UserDTO> userDTOs);
}
package com.icc.web.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.icc.web.dto.UserDTO;
import com.icc.web.mapper.UserMapper;
import com.icc.web.model.User;
import com.icc.web.services.user.UserServices;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {
  private final UserServices userService;

  @GetMapping("/")
  public ResponseEntity<List<UserDTO>> getAllUsers() {
    List<User> users = userService.getAllUsers();
    List<UserDTO> responseUsers = UserMapper.INSTANCE.usersToDtos(users);
    if (responseUsers.isEmpty())
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    return new ResponseEntity<>(responseUsers, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
    User user = userService.getUserById(id);
    if (user == null)
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    UserDTO fetchedUser = UserMapper.INSTANCE.userToDto(user);

    return new ResponseEntity<>(fetchedUser, HttpStatus.OK);
  }

  @PostMapping("/")
  public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
    User user = UserMapper.INSTANCE.dtoToUserDTO(userDTO);
    User savedUser = userService.saveUser(user);
    if (savedUser == null)
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    UserDTO createdUser = UserMapper.INSTANCE.userToDto(savedUser);

    return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<UserDTO> deleteUser(@PathVariable Long id) {
    User user = userService.deleteUser(id);
    if (user == null)
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    UserDTO deletedUser = UserMapper.INSTANCE.userToDto(user);

    return new ResponseEntity<>(deletedUser, HttpStatus.OK);
  }

}

package com.icc.web.controller;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import com.icc.web.exception.BadRequestException;
import com.icc.web.exception.ForbiddenException;
import com.icc.web.exception.InternalServerError;
import com.icc.web.exception.NoContentException;
import com.icc.web.exception.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.icc.web.dto.ProjectDTO;
import com.icc.web.dto.UserDTO;
import com.icc.web.dto.UserResponseDTO;
import com.icc.web.enums.ERole;
import com.icc.web.mapper.UserMapper;
import com.icc.web.model.Role;
import com.icc.web.model.User;
import com.icc.web.service.JWTService;
import com.icc.web.service.UserService;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api/v1/users/")
@RequiredArgsConstructor
@Slf4j
public class UserController {
  private final UserService userService;
  private final JWTService jwtService;

  @GetMapping
  public ResponseEntity<List<UserResponseDTO>> getAllUsers(@RequestHeader("Authorization") String token) {

    String jwt = token.substring(7);
    Optional<Claims> claims = jwtService.getClaims(jwt);

    if (claims.isEmpty()) {
      throw new BadRequestException("Invalid token");
    }

    if (jwtService.isTokenExpired(jwt)) {
      throw new BadRequestException("Token expired");
    }

    String loggedUsername = claims.get().get("username").toString();
    Optional<User> loggedUser = userService.getUserByUsername(loggedUsername);
    if (loggedUser.isEmpty()) {
      throw new ResourceNotFoundException("User not found");
    }

    Set<Role> roles = loggedUser.get().getRoles();
    boolean isAdminRole = roles.stream().anyMatch(role -> role.getName().equals(ERole.ADMIN));

    if (!isAdminRole) {
      throw new BadRequestException("Unauthorized");
    }

    List<User> users = userService.getAllUsers();
    List<UserResponseDTO> responseUsers = UserMapper.INSTANCE.usersToResponseDtos(users);
    if (responseUsers.isEmpty()) {
      throw new NoContentException("No Users Found");
    }

    return new ResponseEntity<>(responseUsers, HttpStatus.OK);
  }

  @GetMapping("{id}")
  public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id,
      @RequestHeader("Authorization") String token) {

    String jwt = token.substring(7);
    Optional<Claims> claims = jwtService.getClaims(jwt);

    if (claims.isEmpty()) {
      throw new BadRequestException("Invalid token");
    }

    if (jwtService.isTokenExpired(jwt)) {
      throw new BadRequestException("Token expired");
    }

    String loggedUsername = claims.get().get("username").toString();
    Optional<User> loggedUser = userService.getUserByUsername(loggedUsername);
    if (loggedUser.isEmpty()) {
      throw new ResourceNotFoundException("User not found");
    }

    Set<Role> roles = loggedUser.get().getRoles();
    boolean isAdminRole = roles.stream().anyMatch(role -> role.getName().equals(ERole.ADMIN));

    if (!isAdminRole) {
      throw new BadRequestException("Unauthorized");
    }

    Optional<User> user = userService.getUserById(id);
    if (user.isEmpty()) {
      throw new ResourceNotFoundException("User not found");
    }

    UserResponseDTO fetchedUser = UserMapper.INSTANCE.userToResponseDto(user.get());
    if (fetchedUser == null) {
      throw new InternalServerError("Internal Server Error");
    }

    return new ResponseEntity<>(fetchedUser, HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserDTO userDTO,
      @RequestHeader("Authorization") String token) {
    String jwt = token.substring(7);
    Optional<Claims> claims = jwtService.getClaims(jwt);

    if (claims.isEmpty()) {
      throw new BadRequestException("Invalid token");
    }

    if (jwtService.isTokenExpired(jwt)) {
      throw new BadRequestException("Token expired");
    }

    if (UserDTO.validateNoNull(userDTO)) {
      throw new ForbiddenException("All fields are mandatory");
    }

    String loggedUsername = claims.get().get("username").toString();
    Optional<User> loggedUser = userService.getUserByUsername(loggedUsername);
    if (loggedUser.isEmpty()) {
      throw new ResourceNotFoundException("User not found");
    }

    Set<Role> roles = loggedUser.get().getRoles();
    boolean isAdminRole = roles.stream().anyMatch(role -> role.getName().equals(ERole.ADMIN));

    if (!isAdminRole) {
      throw new BadRequestException("Unauthorized");
    }

    if (userService.existsByUsername(userDTO.getUsername())) {
      throw new BadRequestException("Username already exists");
    }

    if (userService.existsByEmail(userDTO.getEmail())) {
      throw new BadRequestException("Email already exists");
    }

    User user = UserMapper.INSTANCE.dtoToUserDTO(userDTO);
    Optional<User> savedUser = userService.saveUser(user);
    if (savedUser.isEmpty()) {
      throw new InternalServerError("Internal Server Error");
    }

    UserResponseDTO createdUser = UserMapper.INSTANCE.userToResponseDto(savedUser.get());
    if (createdUser == null)
      throw new InternalServerError("Internal Server Error");

    return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
  }

  @PatchMapping("{id}")
  public ResponseEntity<UserResponseDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO,
      @RequestHeader("Authorization") String token) {
    String jwt = token.substring(7);
    Optional<Claims> claims = jwtService.getClaims(jwt);

    if (claims.isEmpty()) {
      throw new BadRequestException("Invalid token");
    }

    if (jwtService.isTokenExpired(jwt)) {
      throw new BadRequestException("Token expired");
    }

    if (UserDTO.validateNoNull(userDTO)) {
      throw new ForbiddenException("All fields are mandatory");
    }

    String loggedUsername = claims.get().get("username").toString();
    Optional<User> loggedUser = userService.getUserByUsername(loggedUsername);
    if (loggedUser.isEmpty()) {
      throw new ResourceNotFoundException("User not found");
    }

    Set<Role> roles = loggedUser.get().getRoles();
    boolean isAdminRole = roles.stream().anyMatch(role -> role.getName().equals(ERole.ADMIN));

    if (!isAdminRole) {
      throw new BadRequestException("Unauthorized");
    }

    Optional<User> user = userService.getUserById(id);
    if (user.isEmpty()) {
      throw new ResourceNotFoundException("User not found");
    }

    if (userService.existsByUsername(userDTO.getUsername())
        && !user.get().getUsername().equals(userDTO.getUsername())) {
      throw new BadRequestException("Username already exists");
    }

    if (userService.existsByEmail(userDTO.getEmail()) && !user.get().getEmail().equals(userDTO.getEmail())) {
      throw new BadRequestException("Email already exists");
    }

    User updatedUser = UserMapper.INSTANCE.dtoToUserDTO(userDTO);
    updatedUser.setId(id);
    updatedUser.setPassword(user.get().getPassword());
    updatedUser.setEmail(user.get().getEmail());
    Optional<User> savedUser = userService.saveUser(updatedUser);
    if (savedUser.isEmpty()) {
      throw new InternalServerError("Internal Server Error");
    }

    UserResponseDTO updatedUserResponse = UserMapper.INSTANCE.userToResponseDto(savedUser.get());
    if (updatedUserResponse == null)
      throw new InternalServerError("Internal Server Error");

    return new ResponseEntity<>(updatedUserResponse, HttpStatus.OK);
  }

  @DeleteMapping("{id}")
  public ResponseEntity<UserResponseDTO> deleteUser(@PathVariable Long id,
      @RequestHeader("Authorization") String token) {
    String jwt = token.substring(7);
    Optional<Claims> claims = jwtService.getClaims(jwt);

    if (claims.isEmpty()) {
      throw new BadRequestException("Invalid token");
    }

    if (jwtService.isTokenExpired(jwt)) {
      throw new BadRequestException("Token expired");
    }

    String loggedUsername = claims.get().get("username").toString();
    Optional<User> loggedUser = userService.getUserByUsername(loggedUsername);
    if (loggedUser.isEmpty()) {
      throw new ResourceNotFoundException("User not found");
    }

    Set<Role> roles = loggedUser.get().getRoles();
    boolean isAdminRole = roles.stream().anyMatch(role -> role.getName().equals(ERole.ADMIN));

    if (!isAdminRole) {
      throw new BadRequestException("Unauthorized");
    }

    if (loggedUser.get().getId().equals(id)) {
      throw new BadRequestException("Cannot delete yourself");
    }

    Optional<User> user = userService.deleteUser(id);
    if (user.isEmpty())
      throw new ResourceNotFoundException("User not found");

    UserResponseDTO deletedUser = UserMapper.INSTANCE.userToResponseDto(user.get());
    if (deletedUser == null)
      throw new InternalServerError("Internal Server Error");

    return new ResponseEntity<>(deletedUser, HttpStatus.OK);
  }

}

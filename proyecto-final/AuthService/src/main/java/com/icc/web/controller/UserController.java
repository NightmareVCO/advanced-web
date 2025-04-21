package com.icc.web.controller;

import com.icc.web.annotation.AdminRoute;
import com.icc.web.annotation.GatewayValidation;
import com.icc.web.dto.UserDTO;
import com.icc.web.dto.UserResponseDTO;
import com.icc.web.exception.ConflictException;
import com.icc.web.exception.InternalServerError;
import com.icc.web.exception.ResourceNotFoundException;
import com.icc.web.mapper.UserMapper;
import com.icc.web.model.UserInfo;
import com.icc.web.service.UserInfoService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@GatewayValidation
@RequiredArgsConstructor
@RequestMapping("/api/v1/users/")
public class UserController {
    private final UserInfoService userInfoService;

    @GetMapping
    @AdminRoute
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {

        List<UserInfo> users = userInfoService.getAllUsers();
        List<UserResponseDTO> userResponseDTOs = UserMapper.INSTANCE.usersToResponseDtos(users);

        return new ResponseEntity<>(userResponseDTOs, HttpStatus.OK);
    }

    @GetMapping("role-by-id/{id}")
    public ResponseEntity<String> userExistByRole(@PathVariable ObjectId id) {
        String role = userInfoService.userExistByRole(id);
        if (role == null) {
            throw new ResourceNotFoundException("User not found");
        }
        return new ResponseEntity<>(role, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable ObjectId id) {
        Optional<UserInfo> optUser = userInfoService.getUserById(id);
        if (optUser.isEmpty()) {
            throw new ResourceNotFoundException("User not found");
        }

        UserInfo user = optUser.get();
        UserResponseDTO userResponseDTO = UserMapper.INSTANCE.userToResponseDto(user);

        return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
    }

    @PostMapping
    @AdminRoute
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserDTO userDTO) {
        String username = userDTO.getUsername();
        boolean userByUsernameExists = userInfoService.existsByUsername(username);
        if (userByUsernameExists) {
            throw new ConflictException("Username already exists");
        }

        String email = userDTO.getEmail();
        boolean userByEmailExists = userInfoService.existsByEmail(email);
        if (userByEmailExists) {
            throw new ConflictException("Email already exists");
        }

        UserInfo newUserData = UserMapper.INSTANCE.dtoToUser(userDTO);

        Optional<UserInfo> optNewCreatedUser = userInfoService.saveUser(newUserData);
        if (optNewCreatedUser.isEmpty()) {
            throw new InternalServerError("User could not be created");
        }

        UserInfo newCreatedUser = optNewCreatedUser.get();
        UserResponseDTO userResponseDTO = UserMapper.INSTANCE.userToResponseDto(newCreatedUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(userResponseDTO);
    }

    @PutMapping("{id}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable ObjectId id, @Valid @RequestBody UserDTO userDTO) {
        String username = userDTO.getUsername();
        boolean userByUsernameExists = userInfoService.existsByUsername(username);
        if (userByUsernameExists) {
            throw new ConflictException("Username already exists");
        }

        String email = userDTO.getEmail();
        boolean userByEmailExists = userInfoService.existsByEmail(email);
        if (userByEmailExists) {
            throw new ConflictException("Email already exists");
        }

        boolean userExists = userInfoService.existsById(id);
        if (!userExists) {
            throw new ResourceNotFoundException("User not found");
        }

        UserInfo updatedUserData = UserMapper.INSTANCE.dtoToUser(userDTO);
        updatedUserData.setId(id);

        Optional<UserInfo> optUpdatedUser = userInfoService.saveUser(updatedUserData);
        if (optUpdatedUser.isEmpty()) {
            throw new InternalServerError("User could not be updated");
        }

        UserInfo updatedUser = optUpdatedUser.get();
        UserResponseDTO userResponseDTO = UserMapper.INSTANCE.userToResponseDto(updatedUser);

        return new ResponseEntity<>(userResponseDTO, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    @AdminRoute
    public ResponseEntity<UserResponseDTO> deleteUser(@PathVariable ObjectId id) {
        boolean userExists = userInfoService.existsById(id);
        if (!userExists) {
            throw new ResourceNotFoundException("User not found");
        }

        Optional<UserInfo> optDeletedUser = userInfoService.deleteUser(id);
        if (optDeletedUser.isEmpty()) {
            throw new InternalServerError("User could not be deleted");
        }

        UserInfo deletedUser = optDeletedUser.get();
        UserResponseDTO deletedUserResponseDTO = UserMapper.INSTANCE.userToResponseDto(deletedUser);

        return new ResponseEntity<>(deletedUserResponseDTO, HttpStatus.OK);
    }
}

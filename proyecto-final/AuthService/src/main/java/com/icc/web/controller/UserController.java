package com.icc.web.controller;

import com.icc.web.dto.UserDTO;
import com.icc.web.dto.UserResponseDTO;
import com.icc.web.mapper.UserMapper;
import com.icc.web.model.UserInfo;
import com.icc.web.service.UserInfoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserInfoService userInfoService;
    private final UserMapper userMapper;

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userMapper.usersToResponseDtos(userInfoService.getAllUsers());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable ObjectId id) {
        Optional<UserResponseDTO> user = userInfoService.getUserById(id)
                .map(userMapper::userToResponseDto);
        return user.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(@Valid @RequestBody UserDTO userDTO) {
        if (userInfoService.existsByUsername(userDTO.getUsername()) || userInfoService.existsByEmail(userDTO.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        Optional<UserResponseDTO> savedUser = userInfoService.saveUser(userMapper.dtoToUserDTO(userDTO))
                .map(userMapper::userToResponseDto);
        return savedUser.map(user -> ResponseEntity.status(HttpStatus.CREATED).body(user))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(@PathVariable ObjectId id, @Valid @RequestBody UserDTO userDTO) {
        Optional<UserResponseDTO> updatedUser = userInfoService.getUserById(id)
                .map(existingUser -> {
                    UserInfo updatedInfo = userMapper.dtoToUserDTO(userDTO);
                    updatedInfo.setId(id);
                    return userInfoService.saveUser(updatedInfo).map(userMapper::userToResponseDto);
                })
                .orElse(Optional.empty());
        return updatedUser.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable ObjectId id) {
        Optional<UserInfo> user = userInfoService.deleteUser(id);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.noContent().build();
    }
}
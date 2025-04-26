package com.icc.web.controller;

import com.icc.web.annotation.GatewayValidation;
import com.icc.web.dto.AuthResponseDTO;
import com.icc.web.dto.UserDTO;
import com.icc.web.exception.BadRequestException;
import com.icc.web.exception.InternalServerError;
import com.icc.web.mapper.UserMapper;
import com.icc.web.model.UserInfo;
import com.icc.web.service.JwtService;
import com.icc.web.service.UserInfoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@GatewayValidation
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/register/")
public class RegisterController {

    private final UserInfoService userInfoService;
    private final JwtService jwtService;

    @PostMapping
    public ResponseEntity<AuthResponseDTO> register(@Valid @RequestBody UserDTO userDTO) {
        String username = userDTO.getUsername();
        if (userInfoService.existsByUsername(username)) {
            throw new BadRequestException("Username already exists");
        }

        String email = userDTO.getEmail();
        if (userInfoService.existsByEmail(email)) {
            throw new BadRequestException("Email already exists");
        }

        UserInfo newUserData = UserMapper.INSTANCE.dtoToUser(userDTO);
        Optional<UserInfo> optNewCreatedUser = userInfoService.saveUser(newUserData);
        if (optNewCreatedUser.isEmpty()) {
            throw new InternalServerError("User could not be created");
        }

        String token = jwtService.generateToken(username).getToken();
        AuthResponseDTO authResponseDTO = new AuthResponseDTO(token);

        return new ResponseEntity<>(authResponseDTO, HttpStatus.CREATED);
    }
}
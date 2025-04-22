package com.icc.web.controller;

import com.icc.web.annotation.GatewayValidation;
import com.icc.web.dto.AuthResponseDTO;
import com.icc.web.dto.UserDTO;
import com.icc.web.exception.BadRequestException;
import com.icc.web.model.UserInfo;
import com.icc.web.service.JwtService;
import com.icc.web.service.UserInfoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
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
        if (userInfoService.existsByUsername(userDTO.getUsername())) {
            throw new BadRequestException("Username already exists");
        }

        if (userInfoService.existsByEmail(userDTO.getEmail())) {
            throw new BadRequestException("Email already exists");
        }

        UserInfo newUser = UserInfo.builder()
                .id(new ObjectId())
                .username(userDTO.getUsername())
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .firstName(userDTO.getFirstName())
                .lastName(userDTO.getLastName())
                .role("USER")
                .active(true)
                .build();

        userInfoService.saveUser(newUser);

        String token = jwtService.generateToken(userDTO.getUsername()).getToken();
        AuthResponseDTO authResponseDTO = new AuthResponseDTO(token);

        return new ResponseEntity<>(authResponseDTO, HttpStatus.CREATED);
    }
}
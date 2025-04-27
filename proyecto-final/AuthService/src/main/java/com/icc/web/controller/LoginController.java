package com.icc.web.controller;

import com.icc.web.annotation.GatewayValidation;
import com.icc.web.dto.AuthResponseDTO;
import com.icc.web.dto.LoginDTO;
import com.icc.web.exception.UnauthorizedException;
import com.icc.web.model.UserInfo;
import com.icc.web.service.JwtService;
import com.icc.web.service.UserInfoService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@GatewayValidation
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth/login/")
public class LoginController {

    private final UserInfoService userInfoService;
    private final JwtService jwtService;

    @PostMapping
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        String username = loginDTO.getUsername();
        Optional<UserInfo> optUser = userInfoService.getUserByUsername(username);
        if (optUser.isEmpty()) {
            throw new UnauthorizedException("Invalid credentials");
        }

        UserInfo user = optUser.get();
        if (!user.isActive()) {
            throw new UnauthorizedException("User is not active");
        }

        String storedPassword = user.getPassword();
        String receivedPassword = loginDTO.getPassword();

        boolean passwordMatches = userInfoService.checkPassword(receivedPassword, storedPassword);

        if (!passwordMatches) {
            throw new UnauthorizedException("Invalid credentials");
        }

        String token = jwtService.generateToken(username).getToken();
        AuthResponseDTO authResponseDTO = new AuthResponseDTO(token);

        return new ResponseEntity<>(authResponseDTO, HttpStatus.OK);
    }
}

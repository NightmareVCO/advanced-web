package com.icc.web.controller;

import com.icc.web.dto.AuthResponseDTO;
import com.icc.web.dto.LoginDTO;
import com.icc.web.exception.ResourceNotFoundException;
import com.icc.web.exception.UnauthorizedException;
import com.icc.web.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth/login/")
@RequiredArgsConstructor
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        String userName = loginDTO.getUsername();
        String password = loginDTO.getPassword();

        Authentication authentication;
        try {
            authentication =
                    authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(userName, password));
        } catch (AuthenticationException e) {
            throw new UnauthorizedException("Invalid username or password");
        }

        if (!authentication.isAuthenticated()) {
            throw new ResourceNotFoundException("User not found");
        }

        String token = jwtService.generateToken(authentication.getName()).getToken();
        AuthResponseDTO authResponseDTO = new AuthResponseDTO(token);

        return new ResponseEntity<>(authResponseDTO, HttpStatus.OK);
    }
}

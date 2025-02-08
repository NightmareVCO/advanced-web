package com.icc.web.controller;

import com.icc.web.dto.AuthResponseDTO;
import com.icc.web.dto.LoginDTO;
import com.icc.web.exception.UnauthorizedException;
import com.icc.web.model.User;
import com.icc.web.service.JWTService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.icc.web.service.UserService;
import com.icc.web.Utils;
import com.icc.web.exception.ResourceNotFoundException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/login")
public class LoginController {

    private final UserService userService;
    private final JWTService jwtService;

    @PostMapping()
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO ) {
        String userName = loginDTO.getUsername();
        User user = userService.getUserByUsername(userName);
        String password = loginDTO.getPassword();

        if (user == null)
            throw new ResourceNotFoundException("Credeciales incorrectas");
        if (!Utils.isPasswordCorrect(user.getPassword(), password))
            throw new UnauthorizedException("Credenciales incorrectas");

        AuthResponseDTO token = jwtService.generateToken(userName);
        return new ResponseEntity<>(token, HttpStatus.OK);
    }

}
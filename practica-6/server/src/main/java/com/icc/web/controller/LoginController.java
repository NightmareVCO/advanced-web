/* (C)2025 */
package com.icc.web.controller;

import com.icc.web.Utils;
import com.icc.web.dto.AuthResponseDTO;
import com.icc.web.dto.LoginDTO;
import com.icc.web.exception.ResourceNotFoundException;
import com.icc.web.exception.UnauthorizedException;
import com.icc.web.model.User;
import com.icc.web.service.JWTService;
import com.icc.web.service.UserService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/login/")
public class LoginController {

    private final UserService userService;
    private final JWTService jwtService;

    @PostMapping
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO) {
        String userName = loginDTO.getUsername();
        String password = loginDTO.getPassword();
        Optional<User> user = userService.getUserByUsername(userName);
        if (user.isEmpty()) throw new ResourceNotFoundException("Wrong Credentials");

        if (!Utils.isPasswordCorrect(password, user.get().getPassword()))
            throw new UnauthorizedException("Wrong Credentials");

        AuthResponseDTO token = jwtService.generateToken(userName);

        return new ResponseEntity<>(token, HttpStatus.OK);
    }
}

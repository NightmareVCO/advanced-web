package com.icc.web.controller;

import com.icc.web.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/login")
public class LoginController {

    @PostMapping()
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        if ("admin".equals(loginDTO.getUsername()) && "admin".equals(loginDTO.getPassword()))
            return ResponseEntity.ok("{\"message\": \"Login successful\"}");
        else
            return ResponseEntity.status(401).body("{\"error\": \"Invalid credentials\"}");
    }

}

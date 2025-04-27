package com.icc.web.controller;

import com.icc.web.dto.OrderDTO;
import com.icc.web.service.EmailService;
import com.icc.web.annotation.GatewayValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.icc.web.dto.UserDTO;
import java.util.Map;

@RestController
@GatewayValidation
@RequestMapping("/api/v1/email/")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("send-registration")
    public ResponseEntity<Boolean> sendRegistrationEmail(@RequestBody UserDTO infoDTO) {
        String email = infoDTO.getEmail();
        String name = infoDTO.getName();

        Boolean sent = emailService.sendRegistrationConfirmationEmail(email, name);

        return new ResponseEntity<>(sent, HttpStatus.OK);
    }

    @PostMapping("send-purchase")
    public ResponseEntity<?> sendPurchaseConfirmationEmail(@RequestBody OrderDTO purchaseDTO) {
        try {
            Boolean emailSent = emailService.sendPurchaseConfirmationEmail(purchaseDTO);
            return new ResponseEntity<>(Map.of("success", emailSent), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
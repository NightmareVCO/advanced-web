package com.icc.web.controller;

import com.icc.web.dto.UserPurchaseDTO;
import com.icc.web.service.EmailService;
import com.icc.web.annotation.GatewayValidation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.icc.web.dto.InfoDTO;

@RestController
@GatewayValidation
@RequestMapping("/api/v1/email/")
@RequiredArgsConstructor
public class EmailController {

    private final EmailService emailService;

    @PostMapping("send-registration")
    public ResponseEntity<Boolean> sendRegistrationEmail(@RequestBody InfoDTO infoDTO) {
        String email = infoDTO.getEmail();
        String name = infoDTO.getName();

        Boolean sent = emailService.sendRegistrationConfirmationEmail(email, name);

        return new ResponseEntity<>(sent, HttpStatus.OK);
    }

    @PostMapping("send-purchase")
    public ResponseEntity<Boolean> sendPurchaseConfirmationEmail(@RequestBody UserPurchaseDTO purchaseDTO) {
        Boolean sent = emailService.sendPurchaseConfirmationEmail(purchaseDTO);
        return new ResponseEntity<>(sent, HttpStatus.OK);
    }
}
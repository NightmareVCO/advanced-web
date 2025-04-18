package com.icc.web.client;


import com.icc.web.dto.MailRegistrationDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "NOTIFICATIONSERVICE")
public interface NotificationClient {

    @PostMapping("/mail/send-registration")
    ResponseEntity<?> sendMail(@RequestBody MailRegistrationDTO mailRegistrationDTO);

}
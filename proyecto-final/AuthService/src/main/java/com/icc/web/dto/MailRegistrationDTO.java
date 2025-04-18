package com.icc.web.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MailRegistrationDTO {
    private String recipient;
    private String username;
    private String msgBody;
    private String subject;
}
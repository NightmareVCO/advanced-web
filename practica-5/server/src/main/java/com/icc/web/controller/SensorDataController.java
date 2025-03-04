package com.icc.web.controller;

import com.google.gson.Gson;
import com.icc.web.entity.SensorData;
import com.icc.web.services.Consumidor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/jms")
public class SensorDataController {
    private final Consumidor consumidor;
    private final SimpMessagingTemplate messagingTemplate;
    private final Gson gson = new Gson();

    @JmsListener(destination = "notificacion_sensores", containerFactory = "topicListenerFactory")
    public void procesarMensaje(String entity) {
        if (entity == null) {
            throw new IllegalArgumentException("No se recibió un mensaje");
        }
        SensorData sensorData = gson.fromJson(entity, SensorData.class);
        consumidor.guardarMensaje(sensorData);
        messagingTemplate.convertAndSend("/topic/sensores", sensorData);
    }
}
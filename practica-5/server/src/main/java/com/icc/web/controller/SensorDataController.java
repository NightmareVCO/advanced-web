/* (C)2025 */
package com.icc.web.controller;

import com.icc.web.services.Consumidor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/jms/")
public class SensorDataController {
    private final Consumidor consumidor;
    private SimpMessagingTemplate messagingTemplate;

    @JmsListener(destination = "notificacion_sensores", containerFactory = "topicListenerFactory")
    @GetMapping()
    public ResponseEntity<?> procesarMensaje1(@RequestBody String entity) {
        if (entity == null) {
            return ResponseEntity.badRequest().body("No se recibió un mensaje");
        }
        // TODO: Parsear el String a un objeto SensorData. Req: Gson
        // TODO: Cada uno debe retornar el mensaje.
        // consumidor.guardarMensaje1(sensorData);
        // messagingTemplate.convertAndSend("/topic/sensores", sensorData);
        return ResponseEntity.ok(sensorData);
    }

    @JmsListener(destination = "notificacion_sensores", containerFactory = "topicListenerFactory")
    @GetMapping()
    public ResponseEntity<?> procesarMensaje2(@RequestBody String entity) {
        if (entity == null) {
            return ResponseEntity.badRequest().body("No se recibió un mensaje");
        }
        // TODO: Parsear el String a un objeto SensorData. Req: Gson
        // TODO: Cada uno debe retornar el mensaje.
        // consumidor.guardarMensaje2(sensorData);
        // messagingTemplate.convertAndSend("/topic/sensores", sensorData);
        return ResponseEntity.ok(sensorData);
    }
}

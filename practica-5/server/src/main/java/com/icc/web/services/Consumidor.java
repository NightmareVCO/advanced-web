package com.icc.web.services;

import com.icc.web.entity.SensorData;
import com.icc.web.repository.SensorDataRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class Consumidor {
    private final SensorDataRepository sensorDataRepository;

    public void guardarMensaje(SensorData sensorData) {
        log.info("Mensaje recibido: {}", sensorData);
        sensorDataRepository.save(sensorData);
    }
}
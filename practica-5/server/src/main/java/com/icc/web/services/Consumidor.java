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

    public void guardarMensaje1(SensorData sensorData) {
        log.info("Mensaje recibido 1: {}", sensorData);
        sensorDataRepository.save(sensorData);
    }

    public void guardarMensaje2(SensorData sensorData) {
        log.info("Mensaje recibido 2: {}", sensorData);
        sensorDataRepository.save(sensorData);
    }
}
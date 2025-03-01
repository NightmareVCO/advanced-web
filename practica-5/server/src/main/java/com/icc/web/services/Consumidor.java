/* (C)2025 */
package com.icc.web.services;

import com.icc.web.entity.SensorData;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class Consumidor {
    public void guardarMensaje1(SensorData sensorData) {
        log.info("Mensaje recibido 1: {}", sensorData);
        // TODO: Guradar el objeto SensorData en una base de dato. Req: Repository
    }

    public void guardarMensaje2(SensorData sensorData) {
        log.info("Mensaje recibido 2: {}", sensorData);
        // TODO: Guradar el objeto SensorData en una base de dato. Req: Repository
    }
}

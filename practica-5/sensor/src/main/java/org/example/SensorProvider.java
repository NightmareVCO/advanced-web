/* (C)2025 */
package org.example;

import java.util.Random;

import com.google.gson.Gson;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class SensorProvider {
    private static final String URL_BROKER = System.getenv("URL_BROKER");
    private static final String USERNAME = System.getenv("ACTIVEMQ_USERNAME");
    private static final String PASSWORD = System.getenv("ACTIVEMQ_PASSWORD");
    private static final int CLIENT_PROVIDER = Integer.parseInt(System.getenv("CLIENT_PROVIDER"));
    private static final int TIME_OUT = Integer.parseInt(System.getenv("TIME_OUT"));
    private static final Random RANDOM = new Random();
    private static final Gson GSON = new Gson();

    public static void main(String[] args) {
        log.info("Inicializando sensor provider");

        Productor productor =
                Productor.builder()
                        .urlBroker(URL_BROKER)
                        .username(USERNAME)
                        .password(PASSWORD)
                        .clientProvider(CLIENT_PROVIDER)
                        .timeOut(TIME_OUT)
                        .random(RANDOM)
                        .gson(GSON)
                        .build();
        try {
            productor.enviarMensaje("notificacion_sensores");
        } catch (Exception e) {
            log.error("Error al enviar mensaje", e);
        }
    }
}

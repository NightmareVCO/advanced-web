/* (C)2025 */
package org.example;

import com.google.gson.Gson;
import java.util.Random;
import javax.jms.*;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.activemq.ActiveMQConnectionFactory;

@Slf4j
@Builder
@RequiredArgsConstructor
public class Productor {
    private final String urlBroker;
    private final String username;
    private final String password;
    private final int clientProvider;
    private final int timeOut;
    private final Gson gson;
    private final Random random;

    public void enviarMensaje(String cola) throws JMSException {
        log.info("Enviando mensaje a la cola: " + cola);

        int maxRetries = 5;
        long retryDelay = 3000; // 3 segundos

        Connection connection = null;
        JMSException lastException = new JMSException("Unknown error");

        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                log.info("Intento de conexión {} de {}", attempt, maxRetries);

                ActiveMQConnectionFactory factory = new ActiveMQConnectionFactory(urlBroker);
                connection = factory.createConnection(username, password);
                connection.start();

                log.info("Conexión establecida al broker: {}", urlBroker);

                Session session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
                Topic topic = session.createTopic(cola);
                MessageProducer producer = session.createProducer(topic);

                while (true) {
                    SensorData sensorData =
                            SensorData.builder()
                                    .idDispositivo(random.nextInt(100))
                                    .clientProvider(clientProvider)
                                    .temperatura(random.nextDouble() * 100)
                                    .humedad(random.nextDouble() * 100)
                                    .fechaGeneracion(System.currentTimeMillis())
                                    .build();

                    String mensaje = gson.toJson(sensorData);
                    TextMessage message = session.createTextMessage(mensaje);
                    producer.send(message);
                    log.info("Mensaje enviado: " + mensaje);

                    pause();
                }
            } catch (JMSException e) {
                lastException = e;
                log.error(
                        "Error al conectar al broker (intento {}/{}): {}",
                        attempt,
                        maxRetries,
                        e.getMessage());

                if (attempt < maxRetries) {
                    try {
                        log.info("Esperando {} ms antes del próximo intento...", retryDelay);
                        Thread.sleep(retryDelay);
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        throw new JMSException(
                                "Interrupción durante el reintento de conexión: "
                                        + ie.getMessage());
                    }
                }
            }
        }

        log.error("Se agotaron los reintentos ({}) para conectar al broker", maxRetries);
        throw lastException;
    }

    private void pause() {
        try {
            Thread.sleep(timeOut);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            e.printStackTrace();
        }
    }
}

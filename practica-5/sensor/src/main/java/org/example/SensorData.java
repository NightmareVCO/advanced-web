/* (C)2025 */
package org.example;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SensorData {
    int idDispositivo;
    int clientProvider;
    double temperatura;
    double humedad;
    long fechaGeneracion;
}

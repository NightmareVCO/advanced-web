/* (C)2025 */
package com.icc.web.entity;

import java.io.Serializable;
import lombok.Builder;
import lombok.Data;

// TODO: Crear un constructor de gson/string a SensorData
@Data
@Builder
public class SensorData implements Serializable {
    int idDispositivo;
    int clientProvider;
    double temperatura;
    double humedad;
    long fechaGeneracion;
}

package hu.bme.aut.webshop.domain.measurement;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class Measurement {

    @Id
    @GeneratedValue
    private Long id;

    private Timestamp timestamp;

    private double temperature ;

    private double humidity;

    private double soilmoisture;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public double getHumidity() {
        return humidity;
    }

    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }

    public double getSoilmoisture() {
        return soilmoisture;
    }

    public void setSoilmoisture(double soilmoisture) {
        this.soilmoisture = soilmoisture;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Measurement measurement = (Measurement) o;

        return id != null ? id.equals(measurement.id) : measurement.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}


package hu.bme.aut.webshop.domain.rpi;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class RpiData {

    @Id
    @GeneratedValue
    private Long id;

    private Timestamp timestamp;

    private double CPU ;

    private double memory;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getCPU() {
        return CPU;
    }

    public void setCPU(double cpu) {
        this.CPU = cpu;
    }

    public double getMemory() {
        return memory;
    }

    public void setMemory(double memory) {
        this.memory = memory;
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

        RpiData rpiData = (RpiData) o;

        return id != null ? id.equals(rpiData.id) : rpiData.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}


package hu.bme.aut.webshop.web;

import hu.bme.aut.webshop.dao.MeasurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class MeasurementController {

    @Autowired
    MeasurementRepository measurementRepository;

    @GetMapping("/api/measurements/temperature")
    public List<Object[]> temperature() {
        return measurementRepository.findByIdTimestampAndTemperature();
    }

    @GetMapping("/api/measurements/humidity")
    public List<Object[]> humidity() {
        return measurementRepository.findByIdTimestampAndHumidity();
    }

    @GetMapping("/api/measurements/soilmoisture")
    public List<Object[]> soilmoisture() {
        return measurementRepository.findByIdTimestampAndSoilMoisture();
    }

}

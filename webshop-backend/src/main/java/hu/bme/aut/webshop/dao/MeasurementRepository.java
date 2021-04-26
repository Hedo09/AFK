package hu.bme.aut.webshop.dao;

import hu.bme.aut.webshop.domain.measurement.Measurement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
@RepositoryRestResource
public interface MeasurementRepository extends JpaRepository<Measurement, Long> {

    @Query("select id, timestamp, temperature from Measurement")
    List<Object[]> findByIdTimestampAndTemperature();

    @Query("select id, timestamp, humidity from Measurement")
    List<Object[]> findByIdTimestampAndHumidity();

    @Query("select id, timestamp, soilmoisture from Measurement")
    List<Object[]> findByIdTimestampAndSoilMoisture();
}


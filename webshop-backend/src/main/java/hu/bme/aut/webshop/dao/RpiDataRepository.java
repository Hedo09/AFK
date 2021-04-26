package hu.bme.aut.webshop.dao;

import hu.bme.aut.webshop.domain.rpi.RpiData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RepositoryRestResource
public interface RpiDataRepository extends JpaRepository<RpiData, Long> {

    @Query("select id, timestamp, CPU, memory from RpiData")
    List<Object[]> findByAll();
}

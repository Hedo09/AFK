package hu.bme.aut.webshop.web;

import hu.bme.aut.webshop.dao.MeasurementRepository;
import hu.bme.aut.webshop.dao.RpiDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RpiController {

    @Autowired
    RpiDataRepository rpiDataRepository;

    @GetMapping("/api/rpidatas")
    public List<Object[]> temperature() {
        return rpiDataRepository.findByAll();
    }

}

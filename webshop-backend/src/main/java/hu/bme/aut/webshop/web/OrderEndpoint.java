package hu.bme.aut.webshop.web;

import hu.bme.aut.webshop.domain.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderEndpoint {

    @Autowired
    private JmsTemplate jmsTemplate;

    private Logger logger = LoggerFactory.getLogger(OrderEndpoint.class);

    @PostMapping
    public Order save(@RequestBody Order o) {
        logger.info("Received order at the webshop application.");
        jmsTemplate.send(s -> s.createObjectMessage(o));
        return o;
    }
}

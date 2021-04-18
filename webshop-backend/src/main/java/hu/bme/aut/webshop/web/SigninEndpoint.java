package hu.bme.aut.webshop.web;

import hu.bme.aut.webshop.auth.data.User;
import hu.bme.aut.webshop.auth.data.UserRepository;
import hu.bme.aut.webshop.domain.Order;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/signin")
public class SigninEndpoint {

    @Autowired
    private UserRepository repository;

    @Autowired
    PasswordEncoder passwordEncoder;

    private Logger logger = LoggerFactory.getLogger(OrderEndpoint.class);

    @PostMapping
    public User save(@RequestBody User u) {
        u.setRoles(List.of("ROLE_USER"));
        logger.info("Received a new user.");
        logger.info("Name: " + u.getName());
        logger.info("Password: "+ u.getPassword());
        repository.save(u);
        return u;
    }
}

package hu.bme.aut.webshop.web;

import hu.bme.aut.webshop.auth.data.user.User;
import hu.bme.aut.webshop.auth.data.user.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/login")
public class LoginEndpoint {

    @Autowired
    private UserRepository repository;

    private Logger logger = LoggerFactory.getLogger(OrderEndpoint.class);

    @PostMapping
    public User save(@RequestBody User u) {
        logger.info("You tried to log in.");
        logger.info("Name: " + u.getName());
        logger.info("Password: "+ u.getPassword());
        List<User> userList = repository.findAll();
        User user = null;
        for (int i = 0; i<userList.size();i++) {
            System.out.println(userList.get(i).getName());
            if(userList.get(i).equals(u)){
                user = userList.get(i);
            }
        }
        if(user == null) {
            System.out.println("failed");
        }
        else {
            System.out.println("OK");
        }
        //jmsTemplate.send(s -> s.createObjectMessage(u));
        return user;
    }
}

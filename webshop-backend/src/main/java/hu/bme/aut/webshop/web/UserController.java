package hu.bme.aut.webshop.web;

import hu.bme.aut.webshop.auth.data.user.User;
import hu.bme.aut.webshop.auth.data.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserRepository userRepository;

    @GetMapping("/api/me")
    public String hello() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        return currentPrincipalName;
    }
    @GetMapping("/api/users")
    public List<String> getUsers(){
        return userRepository.listAllUser();
    }
    @PostMapping("/api/deleteuser")
    public void delete(@RequestBody User u) {
        System.out.println();
        userRepository.deleteById(u.getName());
    }
}

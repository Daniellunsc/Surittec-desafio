package com.surittec.desafio.Desafio.Surittec.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/me")
    public User getUserAuthenticated() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getPrincipal().toString();
        return userRepository.getUserByusuario(username);
    }
}

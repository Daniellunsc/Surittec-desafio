package com.surittec.desafio.Desafio.Surittec.Security;

import com.surittec.desafio.Desafio.Surittec.User.User;
import com.surittec.desafio.Desafio.Surittec.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class AuthenticationService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String usuario) throws UsernameNotFoundException {
        User user = userRepository.getUserByusuario(usuario);
        return user;
    }
}

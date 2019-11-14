package com.surittec.desafio.Desafio.Surittec.Security;

import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEnconderTest implements PasswordEncoder {
    @Override
    public String encode(CharSequence charSequence) {
        return charSequence.toString();
    }

    @Override
    public boolean matches(CharSequence charSequence, String s) {
        return charSequence.toString().equals(s);
    }
}

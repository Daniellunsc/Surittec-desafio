package com.surittec.desafio.Desafio.Surittec.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.StringUtils;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Security;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    public JwtAuthorizationFilter(AuthenticationManager _authManager){
        super(_authManager);
    }

    @Override
    public void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain fChain) throws IOException, ServletException {
        Authentication authentication = this.getAuthentication(req);
        if(authentication == null) {
            fChain.doFilter(req, res);
            return;
        }
        SecurityContextHolder.getContext().setAuthentication(authentication);
        fChain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest req) {
        String token = req.getHeader(SecurityConstants.TOKEN_HEADER);

        if(!StringUtils.isEmpty(token) && token.startsWith(SecurityConstants.TOKEN_PREFIX)){
            try {
                byte[] signinKey = SecurityConstants.JWT_SECRET.getBytes();

                Jws<Claims> parsedToken = Jwts.parser()
                        .setSigningKey(signinKey)
                        .parseClaimsJws(token.replace("Bearer ", ""));

                String usuario = parsedToken.getBody().getSubject();

                if(!StringUtils.isEmpty(usuario)) {
                    return new UsernamePasswordAuthenticationToken(usuario, null);
                }
            } catch(Exception e) {
                System.out.println(e.getMessage());
            }
        }
        return null;
    }
}

package com.surittec.desafio.Desafio.Surittec.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.util.StringUtils;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.security.Key;
import java.security.Security;
import java.util.ArrayList;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthorizationFilter.class);

    public JwtAuthorizationFilter(AuthenticationManager _authManager){
        super(_authManager);
    }

    @Override
    public void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain fChain) throws IOException, ServletException {
        try {
            Authentication authentication = getAuthentication(req);
            if(authentication == null) {
                fChain.doFilter(req, res);
                return;
            }
            SecurityContextHolder.getContext().setAuthentication(authentication);
            fChain.doFilter(req, res);
        } catch(Exception e) {
            System.out.println(e.getMessage());
        }

    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest req) {
        String token = req.getHeader(SecurityConstants.TOKEN_HEADER);

        if(!StringUtils.isEmpty(token) && token.startsWith(SecurityConstants.TOKEN_PREFIX)){
            try {
                byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SecurityConstants.JWT_SECRET);
                Key signingKey = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());

                Jws<Claims> parsedToken = Jwts.parser()
                        .setSigningKey(signingKey)
                        .parseClaimsJws(token.replace("Bearer ", ""));

                String usuario = parsedToken.getBody().getSubject();

                if(!StringUtils.isEmpty(usuario)) {
                    return new UsernamePasswordAuthenticationToken(usuario, null, new ArrayList<>());
                }
            } catch(Exception e) {
                System.out.println(e.getMessage());
            }
        }
        return null;
    }
}

package com.surittec.desafio.Desafio.Surittec.Security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.surittec.desafio.Desafio.Surittec.User.User;
import com.surittec.desafio.Desafio.Surittec.User.UserLoginData;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import net.minidev.json.JSONObject;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.security.Key;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authManager;

    public JwtAuthenticationFilter(AuthenticationManager _authManager) {
        this.authManager = _authManager;

        setFilterProcessesUrl(SecurityConstants.AUTH_LOGIN_URL);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) {
        UserLoginData userLogin = parseLoginData(req);

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userLogin.getUsuario(), userLogin.getSenha());
        return authManager.authenticate(authToken);
    }

    private UserLoginData parseLoginData(HttpServletRequest req) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(req.getInputStream(), UserLoginData.class);
        } catch (IOException exception) {
            return new UserLoginData();
        }
    }

    @Override
    public void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain fChain, Authentication authentication) throws IOException {
        User user = ((User) authentication.getPrincipal());

        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SecurityConstants.JWT_SECRET);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());

        String token = Jwts.builder()
                .signWith(signingKey)
                .setHeaderParam("typ", SecurityConstants.TOKEN_TYPE)
                .setIssuer(SecurityConstants.TOKEN_ISSUER)
                .setAudience(SecurityConstants.TOKEN_AUDIENCE)
                .setSubject(user.getUsuario())
                .compact();

        res.addHeader(SecurityConstants.TOKEN_HEADER, SecurityConstants.TOKEN_PREFIX + token);
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        JSONObject json = new JSONObject();
        json.appendField("token", token);
        res.getWriter().write(json.toString());

    }
}

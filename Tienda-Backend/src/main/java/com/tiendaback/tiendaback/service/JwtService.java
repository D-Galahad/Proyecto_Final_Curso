package com.tiendaback.tiendaback.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    public String generateToken(UserDetails userDetails) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);

        byte[] keyBytes = Base64.getDecoder().decode(jwtSecret);
        var key = Keys.hmacShaKeyFor(keyBytes);

        return Jwts.builder()
                .subject(userDetails.getUsername())
                .claim("authorities", userDetails.getAuthorities().stream()
                        .map(Object::toString)
                        .toArray(String[]::new))
                .claim("isAdmin", userDetails.getAuthorities().stream()
                        .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN")))
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(key)
                .compact();
    }

    public String extractUsername(String token) {
        byte[] keyBytes = Base64.getDecoder().decode(jwtSecret);
        var key = Keys.hmacShaKeyFor(keyBytes);

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public Date extractExpiration(String token) {
        byte[] keyBytes = Base64.getDecoder().decode(jwtSecret);
        var key = Keys.hmacShaKeyFor(keyBytes);

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            byte[] keyBytes = Base64.getDecoder().decode(jwtSecret);
            var key = Keys.hmacShaKeyFor(keyBytes);

            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);

            String username = extractUsername(token);
            Date expiration = extractExpiration(token);

            return username.equals(userDetails.getUsername()) && 
                   expiration.after(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}

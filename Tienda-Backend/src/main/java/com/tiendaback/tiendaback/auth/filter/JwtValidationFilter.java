package com.tiendaback.tiendaback.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tiendaback.tiendaback.auth.TokenJwtConfig;
import com.tiendaback.tiendaback.service.JwtService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.*;

public class JwtValidationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String header = request.getHeader(TokenJwtConfig.HEADER_AUTHORIZATION);

            if (header == null || !header.startsWith(TokenJwtConfig.PREFIX_TOKEN)) {
                filterChain.doFilter(request, response);
                return;
            }

            String token = header.replace(TokenJwtConfig.PREFIX_TOKEN, "");
            String username = jwtService.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtService.isTokenValid(token, userDetails)) {
                UsernamePasswordAuthenticationToken authentication = 
                        new UsernamePasswordAuthenticationToken(
                                username, null, userDetails.getAuthorities()
                        );
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response);
        } catch (Exception e) {
            Map<String, Object> body = new HashMap<>();
            body.put("error", "Token inválido");
            body.put("message", e.getMessage());

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(TokenJwtConfig.CONTENT_TYPE);
            response.getWriter().write(new ObjectMapper().writeValueAsString(body));
        }
    }
}

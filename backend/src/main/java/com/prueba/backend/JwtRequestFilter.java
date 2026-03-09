package com.prueba.backend;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import io.jsonwebtoken.JwtException; // Importante para capturar errores de formato
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        // 1. CLÁUSULA DE GUARDA: Si no hay token o es inválido/undefined, ignoramos y seguimos
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ") || authorizationHeader.contains("undefined")) {
            chain.doFilter(request, response);
            return;
        }

        try {
            jwt = authorizationHeader.substring(7);
            username = jwtUtil.extractEmail(jwt); // Aquí es donde antes saltaba la excepción
        } catch (JwtException | IllegalArgumentException e) {
            // Si el token está mal formado, logueamos el error pero NO detenemos la ejecución
            logger.warn("Token JWT inválido o mal formado recibido: " + e.getMessage());
        }

        // 2. Si logramos extraer el username y no hay una autenticación previa
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            // 3. Validamos que el token sea correcto para ese usuario
            if (jwtUtil.validateToken(jwt, username)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        username, null, new ArrayList<>());
                
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // 4. Establecer la autenticación en el contexto de seguridad
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }
        
        // Continuar con la cadena de filtros
        chain.doFilter(request, response);
    }
}
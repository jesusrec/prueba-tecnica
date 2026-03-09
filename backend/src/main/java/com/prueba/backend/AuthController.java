package com.prueba.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/auth")
// Ya no necesitas @CrossOrigin aquí, lo maneja SecurityConfig
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            // El servicio devuelve el token como String
            String jwt = authService.login(request);
            
            // Lo envolvemos en un Map para que Jackson genere: {"token": "ey..."}
            // Esto soluciona el SyntaxError en el frontend
            return ResponseEntity.ok(Collections.singletonMap("token", jwt));
            
        } catch (RuntimeException e) {
            // Si el usuario no existe o la clave está mal, devolvemos 401 Unauthorized
            return ResponseEntity.status(401)
                .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            // Error genérico de servidor
            return ResponseEntity.status(500)
                .body(Collections.singletonMap("error", "Error interno del servidor"));
        }
    }
}
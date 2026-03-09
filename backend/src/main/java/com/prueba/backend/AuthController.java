package com.prueba.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/auth")

public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            String jwt = authService.login(request);
            return ResponseEntity.ok(Collections.singletonMap("token", jwt));
            
        } catch (RuntimeException e) {
            return ResponseEntity.status(401)
                .body(Collections.singletonMap("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(Collections.singletonMap("error", "Error interno del servidor"));
        }
    }
}
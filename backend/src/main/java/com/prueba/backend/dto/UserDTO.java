package com.prueba.backend.dto;

import java.util.UUID;

public class UserDTO {
    private UUID id;
    private String name;
    private String email;

    // Constructor para convertir de Entidad a DTO fácilmente
    public UserDTO(UUID id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    // Getters y Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
}
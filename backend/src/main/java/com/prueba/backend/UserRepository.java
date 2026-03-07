package com.prueba.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    // Esto ya incluye save(), findAll(), findById(), deleteById() [cite: 49]
}
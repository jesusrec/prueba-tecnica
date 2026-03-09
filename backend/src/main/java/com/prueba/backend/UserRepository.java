package com.prueba.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, UUID> {
    // Spring genera el "SELECT COUNT(*) > 0 FROM users WHERE email = ?" automáticamente
    boolean existsByEmail(String email);
    
    Optional<User> findByEmail(String email);
}
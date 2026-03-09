package com.prueba.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, UUID> {

    boolean existsByEmail(String email);
    
    Optional<User> findByEmail(String email);
}
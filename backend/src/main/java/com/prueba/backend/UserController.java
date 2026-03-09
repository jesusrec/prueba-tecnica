package com.prueba.backend;

import com.prueba.backend.dto.UserDTO;
import com.prueba.backend.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
@Tag(name = "Usuarios", description = "Endpoints para la gestión completa de usuarios y registro")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // 1. LISTAR TODOS LOS USUARIOS
    @GetMapping
    @Operation(summary = "Listar todos los usuarios", description = "Retorna una lista de usuarios registrados utilizando UserDTO para ocultar datos sensibles.")
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserDTO(user.getId(), user.getName(), user.getEmail()))
                .collect(Collectors.toList());
    }

    // 2. CREAR USUARIO (Con Encriptación de Contraseña)
    @PostMapping
    @Operation(summary = "Registrar nuevo usuario", description = "Crea un usuario en el sistema. Verifica que el email no esté duplicado y encripta la contraseña.")
    @ApiResponse(responseCode = "201", description = "Usuario creado exitosamente")
    @ApiResponse(responseCode = "400", description = "El correo ya se encuentra registrado")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            // Lanzamos la excepción y el GlobalExceptionHandler se encarga del resto
            throw new IllegalArgumentException("El correo " + user.getEmail() + " ya está registrado.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);

        UserDTO response = new UserDTO(savedUser.getId(), savedUser.getName(), savedUser.getEmail());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 3. OBTENER UN USUARIO POR ID (UUID)
    @GetMapping("/{id}")
    @Operation(summary = "Obtener usuario por ID", description = "Busca un usuario específico por su UUID y lo devuelve en formato DTO.")
    @ApiResponse(responseCode = "200", description = "Usuario encontrado")
    @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    public ResponseEntity<UserDTO> getUserById(@PathVariable UUID id) {
        return userRepository.findById(id)
                .map(user -> ResponseEntity.ok(new UserDTO(user.getId(), user.getName(), user.getEmail())))
                .orElse(ResponseEntity.notFound().build());
    }

    // 4. ACTUALIZAR USUARIO
    @PutMapping("/{id}")
    @Operation(summary = "Actualizar usuario", description = "Actualiza los datos de un usuario existente. Si se envía password, esta se vuelve a encriptar.")
    @ApiResponse(responseCode = "200", description = "Usuario actualizado correctamente")
    @ApiResponse(responseCode = "404", description = "El ID proporcionado no existe")
    public ResponseEntity<UserDTO> updateUser(@PathVariable UUID id, @RequestBody User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            
            if (userDetails.getPassword() != null && !userDetails.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
            }
            
            User updatedUser = userRepository.save(user);
            return ResponseEntity.ok(new UserDTO(updatedUser.getId(), updatedUser.getName(), updatedUser.getEmail()));
        }).orElse(ResponseEntity.notFound().build());
    }

    // 5. ELIMINAR USUARIO
    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar usuario", description = "Borra permanentemente un usuario de la base de datos por su ID.")
    @ApiResponse(responseCode = "204", description = "Usuario eliminado con éxito")
    @ApiResponse(responseCode = "404", description = "El usuario no existe")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
package com.eia.dwarf_drag_event.controllers;

import com.eia.dwarf_drag_event.models.AuthenticationRequest;
import com.eia.dwarf_drag_event.models.AuthenticationResponse;
import com.eia.dwarf_drag_event.models.RegisterRequest;
import com.eia.dwarf_drag_event.services.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Registro de un nuevo usuario
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    // Inicio de sesión
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
}

package com.bejapasteles.farmacia.entity;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "clientes")
@Schema(description = "Entidad que representa un cliente en la farmacia")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Identificador único del cliente", example = "1")
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Schema(description = "Nombre completo del cliente", example = "Juan Perez")
    private String nombre;

    @NotBlank
    @Size(max = 255)
    @Schema(description = "Dirección del cliente", example = "Calle 123")
    private String direccion;

    @NotBlank
    @Email
    @Schema(description = "Correo electrónico del cliente", example = "juan.perez@example.com")
    private String email;

    @NotBlank
    @Pattern(regexp = "\\d{10}")
    @Schema(description = "Número de teléfono del cliente", example = "1234567890")
    private String telefono;

// Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
}

package com.tiendaback.tiendaback.model.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "productos")
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Size(min = 2, max = 100)
    private String name;
    
    @Min(0)
    private Double precio;
    
    private String marca;
    
    private String modelo;
    
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String imageUrl;
}

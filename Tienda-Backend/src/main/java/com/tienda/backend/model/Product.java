package com.tienda.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    private String id;

    private String name;
    
    @Column(length = 1000)
    private String description;
    
    private Double price;
    private String category;
    private String image;
    private Double rating;
    private Integer stock;

    @ElementCollection
    private List<String> specs;
}

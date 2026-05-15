package com.tiendaback.tiendaback.model.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cart_items")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private Cart cart;
    
    private Long productId;
    
    private String productName;
    
    private Double unitPrice;
    
    private Integer quantity;
    
    public Double getSubtotal() {
        return unitPrice * quantity;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
}

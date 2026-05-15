package com.tiendaback.tiendaback.model.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "carts")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @OneToMany(mappedBy = "cart", fetch = FetchType.EAGER, orphanRemoval = true)
    private List<CartItem> items;
    
    public Integer getTotalItems() {
        return items.stream().mapToInt(item -> item.getQuantity()).sum();
    }
    
    public Double getTotal() {
        return items.stream().mapToDouble(item -> item.getSubtotal()).sum();
    }
}

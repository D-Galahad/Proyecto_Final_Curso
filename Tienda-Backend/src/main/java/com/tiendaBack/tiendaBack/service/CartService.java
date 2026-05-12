package com.tiendaBack.tiendaBack.service;

import com.tiendaBack.tiendaBack.model.models.Cart;

public interface CartService {
    Cart getOrCreateCart(String username);
    void addItem(String username, Long productId, Integer quantity);
    void updateItem(String username, Long productId, Integer quantity);
    void removeItem(String username, Long productId);
    void clearCart(String username);
    Cart getCart(Long id);
    Cart createCart();
}

package com.tiendaback.tiendaback.service;

import com.tiendaback.tiendaback.model.models.Cart;

public interface CartService {
    Cart getOrCreateCart(String username);
    void addItem(String username, Long productId, Integer quantity);
    void updateItem(String username, Long productId, Integer quantity);
    void removeItem(String username, Long productId);
    void clearCart(String username);
    Cart getCart(Long id);
    Cart createCart();
}

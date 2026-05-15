package com.tiendaback.tiendaback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiendaback.tiendaback.model.models.CartItem;

import java.util.Optional;


public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCart_IdAndProductId(Long cartId, Long productId);
    void deleteByCart_Id(Long cartId);
}

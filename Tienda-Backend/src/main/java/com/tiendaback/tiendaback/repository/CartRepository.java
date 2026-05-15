package com.tiendaback.tiendaback.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.tiendaback.tiendaback.model.models.Cart;

import java.util.Optional;


public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserId(Long userId);
    Optional<Cart> findByUser_Username(String username);
}

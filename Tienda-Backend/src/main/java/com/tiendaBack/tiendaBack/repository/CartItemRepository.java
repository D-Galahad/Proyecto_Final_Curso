package com.tiendaBack.tiendaBack.repository;

import com.tiendaBack.tiendaBack.model.models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCart_IdAndProductId(Long cartId, Long productId);
    void deleteByCart_Id(Long cartId);
}

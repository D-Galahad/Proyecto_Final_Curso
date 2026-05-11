package com.tienda.backend.service;

import com.tienda.backend.dto.CartItemDto;
import com.tienda.backend.dto.CartRequest;
import com.tienda.backend.model.CartItem;
import com.tienda.backend.model.Product;
import com.tienda.backend.model.User;
import com.tienda.backend.repository.CartItemRepository;
import com.tienda.backend.repository.ProductRepository;
import com.tienda.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CartService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<CartItemDto> getCart(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<CartItem> cartItems = cartItemRepository.findByUser(user);
        return cartItems.stream().map(ci -> {
            CartItemDto dto = new CartItemDto();
            dto.setId(ci.getProduct().getId());
            dto.setName(ci.getProduct().getName());
            dto.setPrice(ci.getProduct().getPrice());
            dto.setQty(ci.getQty());
            dto.setImage(ci.getProduct().getImage());
            return dto;
        }).collect(Collectors.toList());
    }

    @Transactional
    public void updateCart(CartRequest cartRequest, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<CartItem> existingItems = cartItemRepository.findByUser(user);
        cartItemRepository.deleteAll(existingItems);

        for (CartItemDto dto : cartRequest.getItems()) {
            Product product = productRepository.findById(dto.getId()).orElse(null);
            if (product != null) {
                CartItem item = new CartItem();
                item.setUser(user);
                item.setProduct(product);
                item.setQty(dto.getQty());
                cartItemRepository.save(item);
            }
        }
    }
}

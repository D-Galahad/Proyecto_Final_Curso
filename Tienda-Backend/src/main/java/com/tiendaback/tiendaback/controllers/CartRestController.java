package com.tiendaback.tiendaback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.tiendaback.tiendaback.model.models.Cart;
import com.tiendaback.tiendaback.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("isAuthenticated()")
public class CartRestController {

    @Autowired
    private CartService cartService;

    @GetMapping("/my")
    public ResponseEntity<?> getMyCart(@AuthenticationPrincipal UserDetails user) {
        Cart cart = cartService.getOrCreateCart(user.getUsername());
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/my/items")
    public ResponseEntity<?> addItemToCart(@AuthenticationPrincipal UserDetails user,
                                           @RequestParam Long productId,
                                           @RequestParam Integer quantity) {
        cartService.addItem(user.getUsername(), productId, quantity);
        Cart cart = cartService.getOrCreateCart(user.getUsername());
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/my/items")
    public ResponseEntity<?> updateItemInCart(@AuthenticationPrincipal UserDetails user,
                                              @RequestParam Long productId,
                                              @RequestParam Integer quantity) {
        cartService.updateItem(user.getUsername(), productId, quantity);
        Cart cart = cartService.getOrCreateCart(user.getUsername());
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/my/items")
    public ResponseEntity<?> removeItemFromCart(@AuthenticationPrincipal UserDetails user,
                                                @RequestParam Long productId) {
        cartService.removeItem(user.getUsername(), productId);
        Cart cart = cartService.getOrCreateCart(user.getUsername());
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/my")
    public ResponseEntity<?> clearCart(@AuthenticationPrincipal UserDetails user) {
        cartService.clearCart(user.getUsername());
        Cart cart = cartService.getOrCreateCart(user.getUsername());
        return ResponseEntity.ok(cart);
    }
}

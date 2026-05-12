package com.tiendaBack.tiendaBack.service;

import com.tiendaBack.tiendaBack.model.models.Cart;
import com.tiendaBack.tiendaBack.model.models.CartItem;
import com.tiendaBack.tiendaBack.model.models.User;
import com.tiendaBack.tiendaBack.repository.CartRepository;
import com.tiendaBack.tiendaBack.repository.CartItemRepository;
import com.tiendaBack.tiendaBack.repository.UserRepository;
import com.tiendaBack.tiendaBack.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductoService productoService;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public Cart getOrCreateCart(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario", "username", username));

        return cartRepository.findByUser_Username(username)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setUser(user);
                    return cartRepository.save(cart);
                });
    }

    @Override
    @Transactional
    public void addItem(String username, Long productId, Integer quantity) {
        Cart cart = getOrCreateCart(username);
        var producto = productoService.findById(productId);

        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            cartItemRepository.save(existingItem);
        } else {
            CartItem newItem = new CartItem();
            newItem.setCart(cart);
            newItem.setProductId(productId);
            newItem.setProductName(producto.getName());
            newItem.setUnitPrice(producto.getPrecio());
            newItem.setQuantity(quantity);
            cart.getItems().add(newItem);
            cartItemRepository.save(newItem);
        }
    }

    @Override
    @Transactional
    public void updateItem(String username, Long productId, Integer quantity) {
        Cart cart = getOrCreateCart(username);

        CartItem item = cart.getItems().stream()
                .filter(ci -> ci.getProductId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Producto no encontrado en el carrito"));

        item.setQuantity(quantity);
        cartItemRepository.save(item);
    }

    @Override
    @Transactional
    public void removeItem(String username, Long productId) {
        Cart cart = getOrCreateCart(username);

        CartItem item = cart.getItems().stream()
                .filter(ci -> ci.getProductId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Producto no encontrado en el carrito"));

        cart.getItems().remove(item);
        cartItemRepository.delete(item);
    }

    @Override
    @Transactional
    public void clearCart(String username) {
        Cart cart = getOrCreateCart(username);
        cartItemRepository.deleteByCart_Id(cart.getId());
        cart.getItems().clear();
    }

    @Override
    @Transactional
    public Cart getCart(Long id) {
        return cartRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Carrito", "id", id));
    }

    @Override
    @Transactional
    public Cart createCart() {
        return cartRepository.save(new Cart());
    }
}

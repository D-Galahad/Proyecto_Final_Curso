package com.tiendaback.tiendaback.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.tiendaback.tiendaback.service.UserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private UserService userService;

    @GetMapping("/panel")
    public ResponseEntity<Map<String, Object>> getAdminPanel() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Panel de Administrador");
        response.put("totalUsuarios", userService.findAll().size());
        response.put("status", "ok");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/usuarios")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }
}

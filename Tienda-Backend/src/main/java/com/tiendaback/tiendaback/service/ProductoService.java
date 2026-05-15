package com.tiendaback.tiendaback.service;

import java.util.List;

import com.tiendaback.tiendaback.model.models.Producto;

public interface ProductoService {
    List<Producto> findAll();
    Producto findById(Long id);
    Producto save(Producto producto);
    void deleteById(Long id);
}

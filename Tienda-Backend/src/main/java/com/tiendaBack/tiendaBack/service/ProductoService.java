package com.tiendaBack.tiendaBack.service;

import com.tiendaBack.tiendaBack.model.models.Producto;

import java.util.List;

public interface ProductoService {
    List<Producto> findAll();
    Producto findById(Long id);
    Producto save(Producto producto);
    void deleteById(Long id);
}

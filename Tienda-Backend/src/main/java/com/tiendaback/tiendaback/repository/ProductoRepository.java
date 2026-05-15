package com.tiendaback.tiendaback.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.tiendaback.tiendaback.model.models.Producto;


public interface ProductoRepository extends JpaRepository<Producto, Long> {
}

package com.tiendaBack.tiendaBack.repository;

import com.tiendaBack.tiendaBack.model.models.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
}

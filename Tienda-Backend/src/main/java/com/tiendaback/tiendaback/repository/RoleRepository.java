package com.tiendaback.tiendaback.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.tiendaback.tiendaback.model.models.Role;
import com.tiendaback.tiendaback.model.models.enums.Roles;

import java.util.Optional;


public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(Roles name);
}

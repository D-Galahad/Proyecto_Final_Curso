package com.tiendaBack.tiendaBack.repository;

import com.tiendaBack.tiendaBack.model.models.Role;
import com.tiendaBack.tiendaBack.model.models.enums.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(Roles name);
}

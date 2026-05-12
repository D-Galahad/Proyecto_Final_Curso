package com.tiendaBack.tiendaBack.service;

import com.tiendaBack.tiendaBack.model.UserRequest;
import com.tiendaBack.tiendaBack.model.models.User;

import java.util.List;

public interface UserService {
    List<User> findAll();
    User findById(Long id);
    User save(User user);
    User update(UserRequest userRequest, Long id);
    void deleteById(Long id);
}

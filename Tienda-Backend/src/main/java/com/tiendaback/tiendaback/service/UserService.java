package com.tiendaback.tiendaback.service;

import java.util.List;

import com.tiendaback.tiendaback.model.UserRequest;
import com.tiendaback.tiendaback.model.models.User;

public interface UserService {
    
    List<User> findAll();
    
    User findById(Long id);
    
    User save(User user);
    
    User update(UserRequest userRequest, Long id);
    
    void deleteById(Long id);
}

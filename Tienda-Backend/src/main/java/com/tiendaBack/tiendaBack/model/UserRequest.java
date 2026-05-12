package com.tiendaBack.tiendaBack.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private String name;
    private String lastname;
    private String email;
    private String username;
    private String password;
    private boolean admin;
}

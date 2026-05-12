package com.tiendaBack.tiendaBack.model;

public interface IUser {
    Long getId();
    String getUsername();
    String getEmail();
    String getName();
    String getLastname();
    boolean isAdmin();
}

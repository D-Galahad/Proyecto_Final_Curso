package com.tiendaback.tiendaback.auth;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.security.core.GrantedAuthority;

public class SimpleGrantedAuthorityJsonCreator implements GrantedAuthority {

    private String authority;

    @JsonCreator
    public SimpleGrantedAuthorityJsonCreator(@JsonProperty("authority") String authority) {
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return this.authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }
}

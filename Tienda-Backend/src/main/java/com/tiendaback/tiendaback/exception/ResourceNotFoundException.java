package com.tiendaback.tiendaback.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resource, String field, Object value) {
        super(resource + " no encontrado/a con " + field + ": " + value);
    }
}

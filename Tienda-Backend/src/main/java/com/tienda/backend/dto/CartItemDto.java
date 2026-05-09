package com.tienda.backend.dto;

import lombok.Data;

@Data
public class CartItemDto {
    private String id;
    private String name;
    private Double price;
    private Integer qty;
    private String image;
}

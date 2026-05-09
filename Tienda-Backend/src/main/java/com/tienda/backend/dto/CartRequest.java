package com.tienda.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class CartRequest {
    private List<CartItemDto> items;
}

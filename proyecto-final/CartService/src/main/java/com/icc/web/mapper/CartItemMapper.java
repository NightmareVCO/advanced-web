package com.icc.web.mapper;

import com.icc.web.dto.CartItemDTO;
import com.icc.web.dto.CartItemResponseDTO;
import com.icc.web.model.CartItem;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CartItemMapper {
    CartItemMapper INSTANCE = Mappers.getMapper(CartItemMapper.class);

    CartItemDTO cartItemToDto(CartItem cartItem);

    CartItem dtoToCartItem(CartItemDTO cartItemDTO);

    CartItemResponseDTO cartItemToResponseDto(CartItem cartItem);

    CartItem responseDtoToCartItem(CartItemResponseDTO cartItemResponseDTO);

    List<CartItemDTO> cartItemsToDtos(List<CartItem> cartItems);

    List<CartItem> dtosToCartItems(List<CartItemDTO> cartItemDTOs);

    List<CartItemResponseDTO> cartItemsToResponseDtos(List<CartItem> cartItems);

    List<CartItem> responseDtosToCartItems(List<CartItemResponseDTO> cartItemResponseDTOs);
}

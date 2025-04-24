package com.icc.web.controller;

import com.icc.web.annotation.GatewayValidation;
import com.icc.web.dto.CartItemDTO;
import com.icc.web.dto.CartItemResponseDTO;
import com.icc.web.mapper.CartItemMapper;
import com.icc.web.model.CartItem;
import com.icc.web.service.CartItemService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@GatewayValidation
@RequiredArgsConstructor
@RequestMapping("/api/v1/cart/")
public class CartController {
  private final CartItemService cartService;

  @GetMapping
  public ResponseEntity<List<CartItemResponseDTO>> getAllCarts() {

    List<CartItem> items = cartService.getAllCartItems();
    List<CartItemResponseDTO> itemsResponseDTO = CartItemMapper.INSTANCE.cartItemsToResponseDtos(items);

    return new ResponseEntity<>(itemsResponseDTO, HttpStatus.OK);
  }

  @GetMapping("user/{userId}")
  public ResponseEntity<List<CartItemResponseDTO>> getAllCartsByUserId(@PathVariable String userId) {

    List<CartItem> items = cartService.getCartItemsByUserId(userId);
    List<CartItemResponseDTO> itemsResponseDTO = CartItemMapper.INSTANCE.cartItemsToResponseDtos(items);

    return new ResponseEntity<>(itemsResponseDTO, HttpStatus.OK);
  }

  @PostMapping()
  public ResponseEntity<CartItemResponseDTO> createCartItem(
      @RequestBody CartItemDTO cartItemDTO) {

    CartItem cartItem = CartItemMapper.INSTANCE.dtoToCartItem(cartItemDTO);
    CartItem createdCartItem = cartService.createCartItem(cartItem);
    CartItemResponseDTO createdCartItemResponseDTO =
        CartItemMapper.INSTANCE.cartItemToResponseDto(createdCartItem);

    return new ResponseEntity<>(createdCartItemResponseDTO, HttpStatus.CREATED);
  }
}

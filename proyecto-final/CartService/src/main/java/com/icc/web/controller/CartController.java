package com.icc.web.controller;

import com.icc.web.annotation.AdminRoute;
import com.icc.web.annotation.GatewayValidation;
import com.icc.web.annotation.UserValidation;
import com.icc.web.dto.CartItemDTO;
import com.icc.web.dto.CartItemResponseDTO;
import com.icc.web.exception.ResourceNotFoundException;
import com.icc.web.exception.UnauthorizedException;
import com.icc.web.mapper.CartItemMapper;
import com.icc.web.model.CartItem;
import com.icc.web.service.CartItemService;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@GatewayValidation
@RequiredArgsConstructor
@RequestMapping("/api/v1/cart/")
public class CartController {
    private final CartItemService cartService;

    @GetMapping
    @AdminRoute
    public ResponseEntity<List<CartItemResponseDTO>> getAllCarts() {

        List<CartItem> items = cartService.getAllCartItems();
        List<CartItemResponseDTO> itemsResponseDTO =
                CartItemMapper.INSTANCE.cartItemsToResponseDtos(items);

        return new ResponseEntity<>(itemsResponseDTO, HttpStatus.OK);
    }

    @GetMapping("user/{userId}")
    @UserValidation
    public ResponseEntity<List<CartItemResponseDTO>> getCartItemsByUserId(
            @RequestHeader("X-User-Id") String authUserId, @PathVariable String userId) {
        if (!authUserId.equals(userId)) {
            throw new UnauthorizedException("Access denied: Not accessing your cart");
        }

        List<CartItem> items = cartService.getCartItemsByUserId(userId);
        List<CartItemResponseDTO> itemsResponseDTO =
                CartItemMapper.INSTANCE.cartItemsToResponseDtos(items);

        return new ResponseEntity<>(itemsResponseDTO, HttpStatus.OK);
    }

    @PostMapping()
    @UserValidation
    public ResponseEntity<CartItemResponseDTO> createCartItem(
            @RequestHeader("X-User-Id") String authUserId, @RequestBody CartItemDTO cartItemDTO) {
        if (!authUserId.equals(cartItemDTO.getUserId())) {
            throw new UnauthorizedException("Access denied: Not adding item to your cart");
        }

        CartItem cartItem = CartItemMapper.INSTANCE.dtoToCartItem(cartItemDTO);
        CartItem createdCartItem = cartService.createCartItem(cartItem);
        CartItemResponseDTO createdCartItemResponseDTO =
                CartItemMapper.INSTANCE.cartItemToResponseDto(createdCartItem);

        return new ResponseEntity<>(createdCartItemResponseDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    @UserValidation
    public ResponseEntity<Void> deleteCartItem(
            @RequestHeader("X-User-Id") String authUserId, @PathVariable Long id) {
        Optional<CartItem> optCartItem = cartService.getCartItemById(id);
        if (optCartItem.isEmpty()) {
            throw new ResourceNotFoundException("Cart item not found");
        }

        CartItem cartItem = optCartItem.get();
        if (cartItem.getUserId() == null) {
            throw new UnauthorizedException("Access denied: Cart item does not have a user ID");
        }

        if (!authUserId.equals(cartItem.getUserId())) {
            throw new UnauthorizedException("Access denied: Not deleting item from your cart");
        }

        cartService.deleteCartItem(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("clean/user/{userId}")
    @UserValidation
    public ResponseEntity<Void> cleanCart(
            @RequestHeader("X-User-Id") String authUserId, @PathVariable String userId) {
        if (!authUserId.equals(userId)) {
            throw new UnauthorizedException("Access denied: Not cleaning your cart");
        }

        cartService.cleanCart(authUserId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

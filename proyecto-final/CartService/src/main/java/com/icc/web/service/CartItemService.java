package com.icc.web.service;

import com.icc.web.model.CartItem;
import com.icc.web.repository.CartItemRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartItemService {
    private final CartItemRepository cartItemRepository;

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public List<CartItem> getCartItemsByUserId(String userId) {
        return cartItemRepository.findByUserId(userId);
    }

    public Optional<CartItem> getCartItemById(Long id) {
        return cartItemRepository.findById(id);
    }

    public CartItem createCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    public void deleteCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }
}

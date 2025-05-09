package com.icc.web.service;

import com.icc.web.model.Order;
import com.icc.web.repository.OrderRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public boolean userHasBook(String userId, String bookId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream().anyMatch(order -> order.getItems().stream()
                .anyMatch(orderItem -> orderItem.getBookId().equals(bookId)));
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }
}

package com.icc.web.controller;

import com.icc.web.annotation.AdminRoute;
import com.icc.web.annotation.GatewayValidation;
import com.icc.web.annotation.UserValidation;
import com.icc.web.dto.OrderDTO;
import com.icc.web.dto.OrderResponseDTO;
import com.icc.web.exception.UnauthorizedException;
import com.icc.web.mapper.OrderMapper;
import com.icc.web.model.Order;
import com.icc.web.service.OrderService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/v1/orders/")
public class OrderController {
    private final OrderService orderService;

    @GetMapping
    @AdminRoute
    public ResponseEntity<List<OrderResponseDTO>> getAllCarts() {
        List<Order> items = orderService.getAllOrders();
        List<OrderResponseDTO> orderResponseDTOs = OrderMapper.INSTANCE.ordersToResponseDtos(items);

        return new ResponseEntity<>(orderResponseDTOs, HttpStatus.OK);
    }

    @GetMapping("user/{userId}")
    @UserValidation
    public ResponseEntity<List<OrderResponseDTO>> getOrdersByUserId(
            @RequestHeader("X-User-Id") String authUserId, @PathVariable String userId) {
        if (!authUserId.equals(userId)) {
            throw new UnauthorizedException("Access denied: Not accessing your orders");
        }

        List<Order> items = orderService.getOrdersByUserId(userId);
        List<OrderResponseDTO> orderResponseDTOs = OrderMapper.INSTANCE.ordersToResponseDtos(items);

        return new ResponseEntity<>(orderResponseDTOs, HttpStatus.OK);
    }

    @PostMapping
    @UserValidation
    public ResponseEntity<OrderResponseDTO> createOrder(
            @RequestHeader("X-User-Id") String authUserId, @RequestBody OrderDTO orderDTO) {
        if (!authUserId.equals(orderDTO.getUserId())) {
            throw new UnauthorizedException("Access denied: Not accessing your orders");
        }

        Order order = OrderMapper.INSTANCE.dtoToOrder(orderDTO);
        Order createdOrder = orderService.createOrder(order);
        OrderResponseDTO orderResponseDTO = OrderMapper.INSTANCE.orderToResponseDto(createdOrder);

        return new ResponseEntity<>(orderResponseDTO, HttpStatus.CREATED);
    }
}

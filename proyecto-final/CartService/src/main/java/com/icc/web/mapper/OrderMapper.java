package com.icc.web.mapper;

import com.icc.web.dto.OrderDTO;
import com.icc.web.dto.OrderResponseDTO;
import com.icc.web.model.Order;
import java.util.List;

import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    OrderDTO orderToDto(Order order);

    Order dtoToOrder(OrderDTO orderDTO);

    OrderResponseDTO orderToResponseDto(Order order);

    Order responseDtoToOrder(OrderResponseDTO orderResponseDTO);

    List<OrderDTO> ordersToDtos(List<Order> orders);

    List<Order> dtosToOrders(List<OrderDTO> orderDTOs);

    List<OrderResponseDTO> ordersToResponseDtos(List<Order> orders);

    List<Order> responseDtosToOrders(List<OrderResponseDTO> orderResponseDTOs);

    @AfterMapping
    default void setOrderInItems(@MappingTarget Order order) {
        if (order.getItems() != null) {
            order.getItems().forEach(item -> item.setOrder(order));
        }
    }
}

package com.icc.web.mapper;

import com.icc.web.dto.OderItemDTO;
import com.icc.web.model.OrderItem;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface OrderItemMapper {

    OderItemDTO orderItemToDto(OrderItem orderItem);

    @Mapping(target = "order", ignore = true)
    OrderItem dtoToOrderItem(OderItemDTO orderItemDTO);

    List<OderItemDTO> orderItemsToDtos(List<OrderItem> orderItems);

    List<OrderItem> dtosToOrderItems(List<OderItemDTO> orderItemDTOs);
}

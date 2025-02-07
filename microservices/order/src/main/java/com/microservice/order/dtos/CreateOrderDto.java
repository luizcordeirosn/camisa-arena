package com.microservice.order.dtos;

import java.util.List;
import com.microservice.order.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderDto {
    
    private Double purchase;
    private List<PurchasedShirt> products;
    private OrderStatus status;
}

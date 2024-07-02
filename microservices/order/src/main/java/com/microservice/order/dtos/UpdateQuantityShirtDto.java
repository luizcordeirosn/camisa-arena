package com.microservice.order.dtos;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateQuantityShirtDto {
    
    private Integer orderId;
    private List<PurchasedShirt> products;
}

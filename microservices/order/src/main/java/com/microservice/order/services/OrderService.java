package com.microservice.order.services;

import org.springframework.data.domain.Page;
import com.microservice.order.dtos.CreateOrderDto;
import com.microservice.order.entities.Order;

public interface OrderService {
    
    Boolean create(CreateOrderDto payload) throws Exception;

    Page<Order> findAll(Integer page, Integer size) throws Exception;
}

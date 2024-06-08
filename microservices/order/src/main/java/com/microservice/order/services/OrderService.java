package com.microservice.order.services;

import com.microservice.order.entities.Order;

public interface OrderService {
    
    Boolean create(Order order) throws Exception;
}

package com.microservice.order.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.microservice.order.dtos.CreateOrderDto;
import com.microservice.order.entities.Order;
import com.microservice.order.services.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService service;
    
    @PostMapping
    public ResponseEntity<Boolean> create(@RequestBody CreateOrderDto payload) throws Exception {

        Order order = new Order();

        try {
            order = Order.builder()
                            .purchase(payload.getPurchase())
                            .products(payload.getProducts())
                            .status(payload.getStatus())
                            .build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
        return ResponseEntity.ok(service.create(order));
    }
}

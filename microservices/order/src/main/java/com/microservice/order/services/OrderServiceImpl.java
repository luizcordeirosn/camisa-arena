package com.microservice.order.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.microservice.order.entities.Order;
import com.microservice.order.repositories.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService{
    
    @Autowired
    private OrderRepository repository;

    public Boolean create(Order order) throws Exception {
        Boolean ret = false;

        try {
            ret = (repository.save(order) != null) ? true : false;
        } catch (Exception e) {
            throw new Exception("Falha ao tentar realizar compra");
        }

        return ret;

    }
}

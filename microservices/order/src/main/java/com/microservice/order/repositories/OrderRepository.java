package com.microservice.order.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.microservice.order.entities.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer>{
    
}

package com.microservice.order.services;

import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.google.gson.Gson;
import com.microservice.order.dtos.CreateOrderDto;
import com.microservice.order.dtos.PurchasedProduct;
import com.microservice.order.entities.Order;
import com.microservice.order.repositories.OrderRepository;
import com.microservice.order.utils.rabbitmq.MessageSender;

@Service
public class OrderServiceImpl implements OrderService{
    
    @Autowired
    private OrderRepository repository;

    @Autowired
    private MessageSender sender;

    public Boolean create(CreateOrderDto payload) throws Exception {
        Gson gson = new Gson();
        Boolean ret = false;

        try {
            Order order = Order.builder()
                    .purchase(payload.getPurchase())
                    .products(payload.getProducts().stream().map(PurchasedProduct::getProductId).collect(Collectors.toList()))
                    .status(payload.getStatus())
                    .build();

            ret = (repository.save(order) != null) ? true : false;
            if(ret) {
                sender.sendMessage(gson.toJson(payload.getProducts()));
            }
        } catch (Exception e) {
            throw new Exception("Falha ao tentar realizar compra - " + e.getMessage());
        }

        return ret;

    }

    public Page<Order> findAll(Integer page, Integer size) throws Exception {
        try {
            Sort sort = Sort.by("createdAt").descending();
            Pageable pageable = PageRequest.of(page,size,sort);
            return repository.findAll(pageable);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new Exception("Falha ao tentar listar todas as compras - " + e.getMessage());
        }
    }
}

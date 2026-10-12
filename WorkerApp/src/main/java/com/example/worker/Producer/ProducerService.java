package com.example.worker.Producer;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.stereotype.Service;

import com.example.worker.Config.RabbitMQBeansConfig;
import com.example.worker.Producer.Out.ReviewCompletedEvent;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProducerService {
    
    private final AmqpTemplate amqpTemplate;
    

    public void produce(ReviewCompletedEvent event){

        amqpTemplate.convertAndSend(RabbitMQBeansConfig.REVIEW_EXCHANGE, RabbitMQBeansConfig.REVIEW_COMPLETED_ROUTING_KEY, event);

    }
}

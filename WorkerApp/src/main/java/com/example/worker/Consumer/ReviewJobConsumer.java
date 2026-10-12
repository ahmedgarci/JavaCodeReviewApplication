package com.example.worker.Consumer;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import com.example.worker.Config.RabbitMQBeansConfig;
import com.example.worker.Consumer.In.JobDto;
import com.example.worker.Services.ReviewService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ReviewJobConsumer {
    
    private final ReviewService reviewService;
    
    @RabbitListener(queues = RabbitMQBeansConfig.REVIEW_QUEUE)
    public void consume(JobDto jobDto)throws Exception{        
        reviewService.analyze(jobDto);
    }
}

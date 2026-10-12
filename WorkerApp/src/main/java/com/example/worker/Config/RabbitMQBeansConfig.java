package com.example.worker.Config;

import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Exchange;
import org.springframework.amqp.core.ExchangeBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class RabbitMQBeansConfig {

    @Value("${sonarAnalyzer.url}")
    private String main_app_url;

    public final AmqpAdmin amqpAdmin;
    public static final String REVIEW_EXCHANGE = "reviewExchange";
    public static final String REVIEW_QUEUE = "reviewQueue";
    public static final String REVIEW_ROUTING_KEY = "review.review";
    public static final String REVIEW_COMPLETED_QUEUE = "reviewCompletedQueue";
    public static final String REVIEW_COMPLETED_ROUTING_KEY = "review.completed";

    @Bean
    public RestClient restClient(){

        return RestClient.builder().baseUrl(main_app_url).build();

    }

    @Bean("reviewQueue")
    public Queue reviewQueue(){
    
        return new Queue("queue.review", true);

    }

    @Bean("reviewCompletedQueue")
    public Queue getQueue(){
    
        return new Queue("queue.review", true);

    }

    @Bean
    public MessageConverter messageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory factory){

        RabbitTemplate rabbitTemplate = new RabbitTemplate(factory);

        rabbitTemplate.setMessageConverter(messageConverter());

        return rabbitTemplate;

    }


    @Bean
    public SimpleRabbitListenerContainerFactory factory(ConnectionFactory connectionFactory){

    var factory = new SimpleRabbitListenerContainerFactory();

    factory.setConnectionFactory(connectionFactory);

    factory.setMessageConverter(new Jackson2JsonMessageConverter());

    return factory;
    }

    
    @Bean()
    public Exchange exchange(){

        return ExchangeBuilder.directExchange(REVIEW_EXCHANGE).durable(true).build();

    }   

    @Bean
    public Binding binding(@Qualifier("reviewQueue") Queue queue,Exchange exchange){

        return BindingBuilder.bind(queue).to(exchange).with(REVIEW_ROUTING_KEY).noargs();

    }

    @Bean("reviewCompletedQueue")
    public Queue reviewCompletedQueue(){
    
        return new Queue(REVIEW_COMPLETED_QUEUE, true);
    
    }

    @Bean
    public Binding reviewCompletedBinding(@Qualifier("reviewCompletedQueue") Queue queue,Exchange exchange){

        return BindingBuilder.bind(queue).to(exchange).with(REVIEW_COMPLETED_ROUTING_KEY).noargs();

    }







}
package com.example.worker.Config;

import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.support.converter.MessageConverter;

@Configuration 
public class RabbitMQMessagesConfig {
    
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
}

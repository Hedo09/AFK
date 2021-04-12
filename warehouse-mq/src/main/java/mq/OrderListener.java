package mq;

import hu.bme.aut.webshop.domain.Order;

import javax.ejb.ActivationConfigProperty;
import javax.ejb.MessageDriven;
import javax.jms.JMSDestinationDefinition;
import javax.jms.JMSException;
import javax.jms.Message;
import javax.jms.MessageListener;

@MessageDriven(activationConfig = {
        @ActivationConfigProperty(propertyName = "destinationLookup",
                propertyValue = "jms/orderQueue"),
        @ActivationConfigProperty(propertyName = "destinationType",
                propertyValue = "javax.jms.Queue")
})
public class OrderListener implements MessageListener {
    @Override
    public void onMessage(Message message) {
        try {
            Order order = message.getBody(Order.class);
            System.out.println(String.format("New order arrived for: %s (%s)", order.getName(), order.getAddress()));
        } catch (JMSException e) {
            e.printStackTrace();
        }
    }
}
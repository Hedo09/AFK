package hu.bme.aut.webshop;

import hu.bme.aut.webshop.auth.data.user.User;
import hu.bme.aut.webshop.dao.MeasurementRepository;
import hu.bme.aut.webshop.dao.RpiDataRepository;
import hu.bme.aut.webshop.domain.Category;
import hu.bme.aut.webshop.domain.Product;
import hu.bme.aut.webshop.domain.measurement.Measurement;
import hu.bme.aut.webshop.auth.data.user.UserRepository;
import hu.bme.aut.webshop.domain.rpi.RpiData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.connection.UserCredentialsConnectionFactoryAdapter;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.jms.ConnectionFactory;
import javax.jms.Queue;
import javax.naming.*;
import java.sql.Timestamp;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Properties;

@SpringBootApplication
@EnableJms
public class WebshopApplication implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MeasurementRepository measurementRepository;

    @Autowired
    private RpiDataRepository rpiDataRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(WebshopApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        User admin = new User();
        admin.setName("admin");
        admin.setPassword(passwordEncoder.encode("admin"));
        admin.setEnabled(true);
        admin.setRoles(List.of("ROLE_ADMIN"));
        userRepository.save(admin);

        // TEST Data
        Measurement measurement1 = new Measurement();
        measurement1.setTimestamp(new Timestamp(System.currentTimeMillis()));
        measurement1.setHumidity(78.7);
        measurement1.setTemperature(25.8);
        measurement1.setSoilmoisture(34.1);
        measurementRepository.save(measurement1);

        Measurement measurement2 = new Measurement();
        measurement2.setTimestamp(new Timestamp(System.currentTimeMillis()+10));
        measurement2.setHumidity(97.7);
        measurement2.setTemperature(36.2);
        measurement2.setSoilmoisture(78.1);
        measurementRepository.save(measurement2);

        Measurement measurement3 = new Measurement();
        measurement3.setTimestamp(new Timestamp(System.currentTimeMillis()+20));
        measurement3.setHumidity(8.7);
        measurement3.setTemperature(40.8);
        measurement3.setSoilmoisture(4.14);
        measurementRepository.save(measurement3);

        RpiData rpiData1 = new RpiData();
        rpiData1.setTimestamp(new Timestamp(System.currentTimeMillis()));
        rpiData1.setMemory(90.1);
        rpiData1.setCPU(78.6);
        rpiDataRepository.save(rpiData1);

        RpiData rpiData2 = new RpiData();
        rpiData2.setTimestamp(new Timestamp(System.currentTimeMillis()));
        rpiData2.setMemory(67.6);
        rpiData2.setCPU(98.2);
        rpiDataRepository.save(rpiData2);


    }

    @Bean
    public Context namingContext() throws NamingException {
        Properties env = new Properties();
        env.put(Context.INITIAL_CONTEXT_FACTORY, "org.jboss.naming.remote.client.InitialContextFactory");
        env.put(Context.PROVIDER_URL, "http-remoting://127.0.0.1:8080");
        return new InitialContext(env);
    }

    @Bean
    public ConnectionFactory connectionFactory(Context namingContext) throws NamingException {
        ConnectionFactory connectionFactory = (ConnectionFactory) namingContext.lookup("jms/RemoteConnectionFactory");
        UserCredentialsConnectionFactoryAdapter adapter = new UserCredentialsConnectionFactoryAdapter();
        adapter.setTargetConnectionFactory(connectionFactory);
        return adapter;
    }

    @Bean
    public Queue orderQueue(Context namingContext) throws NamingException {
        return (Queue) namingContext.lookup("/jms/queue/orderQueue");
    }

    @Bean
    public JmsTemplate jmsTemplate(ConnectionFactory connectionFactory, Queue queue) {
        JmsTemplate jmsTemplate = new JmsTemplate(connectionFactory);
        jmsTemplate.setDefaultDestination(queue);

        return jmsTemplate;
    }

    @Bean
    public RepositoryRestConfigurer repositoryRestConfigurer() {

        return new RepositoryRestConfigurerAdapter() {

            @Override
            public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
                config.setBasePath("/api");
                config.exposeIdsFor(Product.class);
                config.exposeIdsFor(Category.class);
                config.getCorsRegistry().addMapping("/**").allowedOrigins("*").allowedMethods("GET", "POST", "PUT",
                        "DELETE");
            }

        };
    }

    @Bean
    public ServerEndpointExporter endpointExporter() {
        return new ServerEndpointExporter();
    }
}

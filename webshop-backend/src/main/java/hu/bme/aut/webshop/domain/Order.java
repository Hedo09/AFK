package hu.bme.aut.webshop.domain;

import java.io.Serializable;
import java.util.Map;

@SuppressWarnings("serial")
public class Order implements Serializable {
    private String name;
    private String address;

    private Map<Long, Long> quantityPerProductId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Map<Long, Long> getQuantityPerProductId() {
        return quantityPerProductId;
    }

    public void setQuantityPerProductId(Map<Long, Long> quantityPerProductId) {
        this.quantityPerProductId = quantityPerProductId;
    }
}

package com.seetaiah.sweets.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String price;
    private String oldPrice;
    private String image;
    private String vendor;
    private String weight;
    private String badge;
    private String type; // 'BESTSELLER' or 'HOT'
    private Integer discount;
    private String tag;

    // Explicit Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPrice() { return price; }
    public void setPrice(String price) { this.price = price; }
    public String getOldPrice() { return oldPrice; }
    public void setOldPrice(String oldPrice) { this.oldPrice = oldPrice; }
    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
    public String getVendor() { return vendor; }
    public void setVendor(String vendor) { this.vendor = vendor; }
    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }
    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Integer getDiscount() { return discount; }
    public void setDiscount(Integer discount) { this.discount = discount; }
    public String getTag() { return tag; }
    public void setTag(String tag) { this.tag = tag; }
}

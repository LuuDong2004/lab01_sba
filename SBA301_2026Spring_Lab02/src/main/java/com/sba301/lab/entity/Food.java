package com.sba301.lab.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "medicines")
public class Food {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    @Column(name = "food_id")
    private long id;
    @Column(name = "code", nullable = false, length = 10, columnDefinition = "nvarchar(20)")
    private String code;
    @Column(name = "food_name", nullable = false, length = 100, columnDefinition = "nvarchar(100)")
    private String foodName;
    @Column(name = "price", nullable = false)
    private double price;
    @Column(name = "stock", nullable = false)
    private int stock;
    @Column(name = "expired_date", nullable = false)
    private Date expiredDate;
    @Column(name = "manufacturer", nullable = false, length = 100, columnDefinition = "nvarchar(100)")
    private String manufacturer;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getFoodName() { return foodName; }
    public void setFoodName(String foodName) { this.foodName = foodName; }
    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
    public int getStock() { return stock; }
    public void setStock(int stock) { this.stock = stock; }
    public Date getExpiredDate() { return expiredDate; }
    public void setExpiredDate(Date expiredDate) { this.expiredDate = expiredDate; }
    public String getManufacturer() { return manufacturer; }
    public void setManufacturer(String manufacturer) { this.manufacturer = manufacturer; }
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
}

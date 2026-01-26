package com.sba301.lab.dto;

import java.util.Date;

public class FoodDTO {
    private long id;
    private String code;
    private String foodName;
    private double price;
    private int stock;
    private Date expiredDate;
    private String manufacturer;
    private long categoryId;
    private String categoryName;

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
    public long getCategoryId() { return categoryId; }
    public void setCategoryId(long categoryId) { this.categoryId = categoryId; }
    public String getCategoryName() { return categoryName; }
    public void setCategoryName(String categoryName) { this.categoryName = categoryName; }
}